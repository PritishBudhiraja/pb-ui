// Publish every public package whose version is not on npm yet, with the npm CLI.
// npm (11.15+) authenticates through the workflow's OIDC token when the package has
// a trusted publisher for this repo and workflow, so no NPM_TOKEN is needed.
// `pnpm pack` turns workspace:* ranges into real versions before npm sees them.
import { execFileSync } from "node:child_process"
import { mkdtempSync, readFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"

const packages = ["packages/tokens", "packages/ui"]
const dryRun = process.env.DRY_RUN === "1"
const run = (cmd, args, cwd) =>
  execFileSync(cmd, args, { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "inherit"] }).trim()

async function isOnNpm(name, version) {
  const response = await fetch(`https://registry.npmjs.org/${name.replace("/", "%2F")}/${version}`)
  if (response.ok) return true
  if (response.status === 404) return false
  throw new Error(`registry: HTTP ${response.status} for ${name}@${version}`)
}

const out = mkdtempSync(join(tmpdir(), "pb-publish-"))
for (const dir of packages) {
  const {
    name,
    version,
    private: isPrivate,
  } = JSON.parse(readFileSync(`${dir}/package.json`, "utf8"))
  if (isPrivate) continue
  if (await isOnNpm(name, version)) {
    console.log(`${name}@${version} is already on npm`)
    continue
  }
  const tarball = run("pnpm", ["pack", "--pack-destination", out], dir).split("\n").at(-1)
  if (dryRun) {
    console.log(`Would publish ${name}@${version} from ${tarball}`)
    continue
  }
  run("npm", ["publish", tarball, "--access", "public", "--provenance"])
  console.log(`Published ${name}@${version}`)
}
