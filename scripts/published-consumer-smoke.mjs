import { execSync } from "node:child_process"
import { cpSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const artifacts = join(root, "artifacts", "published")
const packDir = join(artifacts, "pack")

function run(command, cwd = root) {
  execSync(command, { cwd, stdio: "inherit" })
}

function tarball(dir, name) {
  const file = readdirSync(dir).find((entry) => entry.startsWith(name))
  if (!file) throw new Error(`missing ${name} tarball in ${dir}`)
  return join(dir, file)
}

function installConsumer(kind, extra) {
  const dest = join(artifacts, kind)
  rmSync(dest, { recursive: true, force: true })
  cpSync(join(root, "consumers", kind), dest, { recursive: true })
  const ui = tarball(packDir, "pritish.budhiraja-ui-")
  const tokens = tarball(packDir, "pritish.budhiraja-tokens-")
  run(`npm install "${ui}" "${tokens}"${extra ? ` ${extra}` : ""}`, dest)
  run("npm run typecheck", dest)
  run("npm run build", dest)
  return dest
}

function viteBundle(dest) {
  const assets = join(dest, "dist", "assets")
  const files = readdirSync(assets)
  const js = files
    .filter((file) => file.endsWith(".js"))
    .map((file) => {
      const bytes = readFileSync(join(assets, file)).byteLength
      return { file, kb: Number((bytes / 1024).toFixed(2)) }
    })
  const css = files
    .filter((file) => file.endsWith(".css"))
    .map((file) => {
      const bytes = readFileSync(join(assets, file)).byteLength
      return { file, kb: Number((bytes / 1024).toFixed(2)) }
    })
  return { js, css }
}

rmSync(artifacts, { recursive: true, force: true })
mkdirSync(packDir, { recursive: true })
run("pnpm --filter @pritish.budhiraja/ui build")
run("pnpm --filter @pritish.budhiraja/tokens pack --pack-destination artifacts/published/pack")
run("pnpm --filter @pritish.budhiraja/ui pack --pack-destination artifacts/published/pack")

const viteDest = installConsumer("vite", "")
const nextDest = installConsumer("next", "")
const sizes = viteBundle(viteDest)
const report = {
  measuredAt: new Date().toISOString(),
  react: "19.2.0",
  tarballs: readdirSync(packDir),
  vite: sizes,
  next: "production build ok",
}
writeFileSync(join(artifacts, "smoke.json"), `${JSON.stringify(report, null, 2)}\n`)
console.log(JSON.stringify(report, null, 2))
void nextDest
