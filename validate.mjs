import assert from "node:assert/strict"
import { readFileSync } from "node:fs"

const apps = JSON.parse(readFileSync("apps.json", "utf8"))
assert.ok(Array.isArray(apps), "Catalog must be an array")
const repos = new Set(), slugs = new Set()
const webUrl = (value) => { try { const url = new URL(value); return ["http:", "https:"].includes(url.protocol) && !url.username && !url.password } catch { return false } }
const assetUrl = (value) => /^\/(?!\/)[a-zA-Z0-9_./-]+$/.test(value) && !value.includes("..") || webUrl(value)
for (const app of apps) {
  assert.ok(app && typeof app === "object", "App must be an object")
  assert.match(app.repo, /^[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+$/)
  for (const key of ["name", "description"]) assert.ok(typeof app[key] === "string" && app[key].trim(), `${app.repo}: ${key} is required`)
  assert.ok(!repos.has(app.repo.toLowerCase()), "Duplicate repository")
  repos.add(app.repo.toLowerCase())
  const slug = app.slug || app.repo.split("/")[1].toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
  assert.match(slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  assert.ok(!slugs.has(slug), "Duplicate slug")
  slugs.add(slug)
  if (app.kind) assert.ok(["Apps", "Tools", "Libraries"].includes(app.kind), "Invalid kind")
  if (app.theme) assert.ok(["violet", "blue", "forest", "orange"].includes(app.theme), "Invalid theme")
  for (const key of ["url", "downloadUrl"]) if (app[key]) assert.ok(webUrl(app[key]), `Invalid ${key}`)
  if (app.icon) assert.ok(assetUrl(app.icon), "Invalid icon")
  for (const key of ["platforms", "requirements"]) if (app[key] !== undefined) assert.ok(Array.isArray(app[key]) && app[key].every((item) => typeof item === "string" && item.trim()), `Invalid ${key}`)
  for (const [key, fields] of [["features", ["title", "description"]], ["sections", ["title", "body"]], ["faq", ["question", "answer"]]]) {
    if (app[key] === undefined) continue
    assert.ok(Array.isArray(app[key]), `Invalid ${key}`)
    for (const item of app[key]) {
      for (const field of fields) assert.ok(typeof item[field] === "string" && item[field].trim(), `${key}: missing ${field}`)
      if (item.image) { assert.ok(assetUrl(item.image), "Invalid section image"); assert.ok(typeof item.imageAlt === "string" && item.imageAlt.trim(), "Section images need alt text") }
    }
  }
}
console.log(`Validated ${apps.length} catalog entries and their product pages.`)
