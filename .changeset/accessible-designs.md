---
'@jasonrundell/dropship': patch
---

Every shipped design now meets WCAG AA, enforced by the test suite.

Adds a contrast check over every colour pairing the components actually put on
screen — text on backgrounds, labels on fills, focus rings on surfaces — for all
four designs. A design whose colours fail cannot be released.

It found four real failures the moment it ran, none of which were visible by
eye:

| Design  | Pairing                | Was    | Now    |
| ------- | ---------------------- | ------ | ------ |
| Arcade  | `primary` on page      | 4.47:1 | 4.72:1 |
| Cascade | `onAccent` on `accent` | 3.74:1 | 4.63:1 |
| Cascade | `success` on page      | 3.60:1 | 4.68:1 |
| Cascade | `warning` on page      | 3.04:1 | 4.69:1 |

Those token values have been darkened to clear the threshold.

Two component changes came out of the same work:

- **`Link` no longer changes colour on hover.** Switching to `accent` made
  `accent` a text colour, which would have forced every design's accent to be
  readable as body copy — impossible for Arcade's yellow. Hover now only
  thickens the underline, leaving `accent` free to be a fill.
- **`Blockquote`'s rule now uses `primary`** rather than `accent`, for the same
  reason: a fill colour cannot be guaranteed visible as a line.

**`Card` fix:** a card with no `media` no longer applies the templated layout.
It was reserving an empty media column and crushing the text beside it, which
was obvious the moment three text-only cards were put in a row.
