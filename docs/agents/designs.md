# Designs (external)

UI design is **not** a phase in the ship flow. Design happens outside (Figma, OpenPencil, or anything else). Drop exports into this repo when you want agents to build against them.

## Layout

```text
.designs/
  release-<N>/     # N matches the release branch: release/2 → release-2
    <any files>    # PNG, PDF, SVG, .fig, HTML, notes, …
```

Create `.designs/` once (empty is fine: a `.gitkeep` only). Create `.designs/release-<N>/` only when you have files for that release.

## When agents use it

Resolve `<N>` from the work's lineage:

| Work | How `<N>` is found |
| --- | --- |
| `/ship-release <N>`, `release/<N>` | The named release |
| Spec whose `**Base:**` is `release/<N>` | That N |
| Ticket whose base is `spec/<issue>` | The spec issue's `**Base:**` if it is `release/<N>` |
| Ticket whose base is `release/<N>` | That N |
| Work based on `main` or a hotfix | No release designs folder |

**Non-empty:** the folder exists and contains at least one file other than `.gitkeep`, `.gitignore`, or `README.md`.

| Folder state | Behaviour |
| --- | --- |
| Missing, or empty (placeholders only) | Ship and build as today. Do not invent design. |
| Non-empty | UI-touching work must open that folder and build to match those files. Tickets name `designs: .designs/release-<N>/`. Logic-only work ignores the folder. |

No approval pack. No design phase inside `/ship-release`. Missing design never blocks a release.
