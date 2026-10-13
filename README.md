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

## Product pages

Every entry automatically gets a product page. No route file or frontend code is
needed, and a newly added app's page works without redeploying the site.
The URL uses `/apps?app=<slug>` so static hosting can open new pages immediately.

Optional fields for a full showcase:

- `slug`: stable lowercase page ID, e.g. `raygun`. Defaults to the repository name.
- `headline`: product-page heading; use `\n` for a line break.
- `intro`: the longer introduction below the heading.
- `icon`: a public image URL, or an existing site asset such as `/apps/raygun.png`.
- `theme`: `violet`, `blue`, `forest`, or `orange`.
- `platforms`: a list such as `["Web"]` or `["Windows", "macOS", "Linux"]`.
- `platformNote`: describe platform-specific limits or separate server components.
- `downloadUrl`: optional link to a real download/release page.
- `requirements`: list of setup notes.
- `features`: objects containing `title` and `description`.
- `sections`: objects containing `title` and `body`; optional `image` must have `imageAlt`.
- `faq`: objects containing `question` and `answer`.

Use the existing entries as complete examples. Add as many sections as needed;
the layout follows the data. Empty optional lists are fine. The site won't guess
platform support for a new app.

The Add project dialog also contains a form that copies a valid entry for you.
Paste it into this file, add any longer sections, and commit the change.
GitHub Actions validates the entries, links, unique page IDs, and image alt text.

The site validates the catalog and keeps its last available list if a request or
validation fails, with a visible message. Only GitHub repository collaborators
can commit edits.
