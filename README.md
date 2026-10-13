# slimysoftware catalog

The public project list for slimysoftware. Edit [apps.json](apps.json) on GitHub
to add, edit, reorder, feature, or remove a project. Commit to `main`, then refresh
the deployed site. No site rebuild or redeploy is needed. GitHub's CDN can take
a few minutes to show a change.

This repository contains public project details only. Do not put secrets here.

## Add a project

Copy an entry inside the JSON array. Separate entries with commas; no trailing
comma after the final entry.

```json
{
  "repo": "kao-offline/your-repo",
  "name": "Your app",
  "description": "What it does, in one or two sentences.",
  "category": "Web app",
  "kind": "Apps",
  "url": "https://your-app.example",
  "language": "TypeScript",
  "featured": false
}
```

- Required: `repo` in `owner/name` format, `name`, and `description`.
- `kind`: `Apps`, `Tools`, or `Libraries` (defaults to `Apps`).
- `url`: optional http/https address. Omit it for a project that only has a GitHub page.
- `category` and `language`: optional labels.
- `featured`: set `true` to show in the featured section (first three featured entries).
- Order entries to set the default display order. Remove an entry to hide it.

The site validates the catalog and keeps its last available list if a request or
validation fails, with a visible message. Only GitHub repository collaborators
can commit edits.
