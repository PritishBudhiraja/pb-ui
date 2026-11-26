import { chmodSync, copyFileSync, existsSync, mkdirSync, readFileSync, statSync } from "node:fs"
import { dirname, join, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const gitPath = join(root, ".git")
if (!existsSync(gitPath)) process.exit(0)

let gitDir = gitPath
if (statSync(gitPath).isFile()) {
  const match = /^gitdir:\s*(.+)$/m.exec(readFileSync(gitPath, "utf8"))
  if (!match?.[1]) process.exit(0)
  gitDir = resolve(root, match[1].trim())
}

const hooks = join(gitDir, "hooks")
mkdirSync(hooks, { recursive: true })
const dest = join(hooks, "pre-commit")
copyFileSync(join(root, "scripts/git-hooks/pre-commit"), dest)
chmodSync(dest, 0o755)
