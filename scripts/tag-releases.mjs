// changesets/action@v1 cannot read the publish output of @changesets/cli v3, so it
// never pushes tags or creates releases. For each public package, tag and release
// every version on npm that has no tag on GitHub yet. Safe to run on every push.
import { execFileSync } from "node:child_process"
import { readFileSync } from "node:fs"
import { setTimeout as sleep } from "node:timers/promises"

const packages = ["packages/tokens", "packages/ui"]
const dryRun = process.env.DRY_RUN === "1"
const run = (cmd, args) => execFileSync(cmd, args, { encoding: "utf8" }).trim()

const remoteTags = new Set(
  run("git", ["ls-remote", "--tags", "origin"])
    .split("\n")
    .map((line) => line.split("refs/tags/")[1])
    .filter(Boolean),
)

// The public registry over HTTPS needs no npm login.
async function publishedVersions(name, current) {
  const url = `https://registry.npmjs.org/${name.replace("/", "%2F")}`
  // A fresh publish can take several minutes to show up.
  for (let attempt = 0; attempt < 20; attempt++) {
    const response = await fetch(url, { headers: { accept: "application/json" } })
    if (!response.ok && response.status !== 404) {
      throw new Error(`${url}: HTTP ${response.status}`)
    }
    const versions = response.ok ? Object.keys((await response.json()).versions ?? {}) : []
    if (versions.includes(current) || attempt === 19) return versions
    await sleep(30_000)
  }
}

// The commit npm's provenance says this version was built from.
async function provenanceCommit(name, version) {
  const url = `https://registry.npmjs.org/-/npm/v1/attestations/${name.replace("/", "%2F")}@${version}`
  const response = await fetch(url)
  if (!response.ok) return undefined
  const { attestations = [] } = await response.json()
  for (const attestation of attestations) {
    if (!attestation.predicateType?.includes("slsa")) continue
    const payload = attestation.bundle?.dsseEnvelope?.payload
    if (!payload) continue
    const statement = JSON.parse(Buffer.from(payload, "base64").toString("utf8"))
    const commit =
      statement.predicate?.buildDefinition?.resolvedDependencies?.[0]?.digest?.gitCommit
    if (commit) return commit
  }
  return undefined
}

// Without provenance: the commit where package.json first carried this version.
function versionCommit(dir, version) {
  const commits = run("git", [
    "log",
    "--reverse",
    "--format=%H",
    "-G",
    `"version": "${version}"`,
    "--",
    `${dir}/package.json`,
  ])
  return commits.split("\n").filter(Boolean)[0]
}

function releaseNotes(dir, version, tag) {
  try {
    const sections = readFileSync(`${dir}/CHANGELOG.md`, "utf8").split(/^## /m)
    const section = sections.find((part) => part.startsWith(`${version}\n`))
    if (section) return section.slice(version.length).trim()
  } catch {}
  return `Published ${tag} to npm.`
}

for (const dir of packages) {
  const pkg = JSON.parse(readFileSync(`${dir}/package.json`, "utf8"))
  if (pkg.private) continue
  const versions = await publishedVersions(pkg.name, pkg.version)
  for (const version of versions) {
    if (version.includes("-")) continue
    const tag = `${pkg.name}@${version}`
    if (remoteTags.has(tag)) continue
    const commit = (await provenanceCommit(pkg.name, version)) ?? versionCommit(dir, version)
    if (!commit) {
      console.log(`Skipped ${tag}: no commit sets this version`)
      continue
    }
    const notes = releaseNotes(dir, version, tag)
    if (dryRun) {
      console.log(`Would tag ${tag} at ${commit.slice(0, 7)} (notes: ${notes.length} chars)`)
      continue
    }
    // changeset publish may already have created this tag locally.
    const local = run("git", ["tag", "--list", tag])
    if (!local) run("git", ["tag", tag, commit])
    run("git", ["push", "origin", `refs/tags/${tag}`])
    run("gh", ["release", "create", tag, "--title", tag, "--notes", notes, "--verify-tag"])
    console.log(`Tagged and released ${tag}`)
  }
}
