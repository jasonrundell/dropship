---
'@jasonrundell/topiary': minor
---

Themes can now control layout, and adds `Card`.

Tokens previously drove appearance only. They now also drive **placement**.
Components with internal structure render their children into named grid areas,
and the theme supplies the `grid-template-areas` string that arranges them — the
direct equivalent of the stable element IDs CSS Zen Garden relied on. The
component guarantees the slots exist; the theme decides where they go.

**New: `Card`**, the first component with internal structure. It exposes four
slots — `media`, `title`, `body`, `actions` — and each shipped theme arranges
them differently from identical props:

| Theme        | Arrangement                                    |
| ------------ | ---------------------------------------------- |
| `hangar`     | Media pinned left in a fixed column            |
| `broadsheet` | Full-bleed media above a single column of text |
| `arcade`     | Media pushed right, text leading               |
| `cascade`    | Media above, title and actions sharing a row   |

**New tokens:** `--topiary-layout-cardAreas` and `--topiary-layout-cardColumns`.
Layout tokens are necessarily per-component, since the area names belong to a
specific component's slots. DTCG has no layout primitive, so these carry a
non-standard `$type`.

**New: `data-part` hooks.** Every `Card` slot carries a stable `data-part`
attribute (`card`, `card-media`, `card-title`, `card-body`, `card-actions`) as a
public hook for a theme that needs to reach past the tokens with its own CSS.
Renaming one is a breaking change.

A token deliberately cannot change DOM order, so visual order and reading order
stay coupled and a theme cannot make the tab order disagree with what is on
screen. A test asserts it.
