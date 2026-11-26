// changesets/action@v1 cannot read the publish output of @changesets/cli v3, so it
// never pushes tags or creates releases. Tag and release every public package
// version that is on npm but has no git tag yet. Safe to run on every push.
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

async function isPublished(tag, version) {
  // A fresh publish can take a few minutes to show up in the registry.
  for (let attempt = 0; attempt < 8; attempt++) {
    try {
      if (run("npm", ["view", tag, "version"]) === version) return true
    } catch {}
    await sleep(30_000)
  }
  return false
}

function releaseNotes(dir, version) {
  try {
    const sections = readFileSync(`${dir}/CHANGELOG.md`, "utf8").split(/^## /m)
    const section = sections.find((part) => part.startsWith(`${version}\n`))
    return section ? section.slice(version.length).trim() : ""
  } catch {
    return ""
  }
}

for (const dir of packages) {
  const {
    name,
    version,
    private: isPrivate,
  } = JSON.parse(readFileSync(`${dir}/package.json`, "utf8"))
  const tag = `${name}@${version}`
  if (isPrivate || remoteTags.has(tag)) continue
  if (!(await isPublished(tag, version))) {
    console.log(`Skipped ${tag}: not on npm`)
    continue
  }
  const notes = releaseNotes(dir, version) || `Published ${tag} to npm.`
  if (dryRun) {
    console.log(`Would tag and release ${tag}\n${notes}\n`)
    continue
  }
  run("git", ["tag", tag])
  run("git", ["push", "origin", tag])
  run("gh", ["release", "create", tag, "--title", tag, "--notes", notes, "--verify-tag"])
  console.log(`Tagged and released ${tag}`)
}
