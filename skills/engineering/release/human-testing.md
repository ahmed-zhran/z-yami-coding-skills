# Human testing: release/<N>

Derived from this release's user stories and acceptance criteria. Grouped by surface. The human marks each check, adds notes on fails or observations, then signs off. The release does **not** tag until Sign-off is **Approved**. After the tag, the filled file is feedback for next-release prep (unchecked items, fails, and notes → tickets / pending-release work).

**How to fill:** open this file in an interactive markdown preview when available (e.g. Herdr `md-preview`) so checkboxes and notes write back here. Otherwise edit the markdown directly.

## Surfaces under test

- <surface>: …

## Checklist

### <surface>

#### <spec or feature title> (#<issue>)

- [ ] <user story / acceptance item the human can walk>
  - Notes:
- [ ] …
  - Notes:

### <surface>

#### …

- [ ] …
  - Notes:

## Sign-off

- Status: Approved | Blocked
- Approved / blocked by:
- Date:
- Summary (optional):

Sign-off is complete only when Status is **Approved** and Approved by / Date are filled. **Blocked** means the release stops until fails are fixed or explicitly deferred with tickets whose `**Base:**` is this release (before tag) or the next release (after tag, via the pending-release feedback box).
