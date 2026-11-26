# ADR-006 Week calendar stays a Hatch grid

- **Status:** accepted
- **Context:** Epoch needs a week of timed events: overlaps, midnight crossings, visible-hour clipping, empty-slot pick, move/resize, keyboard, and a now line. FullCalendar can do that plus recurrence, resources, and iCal.
- **Selected:** Extend `WeekCalendar` / `TimeGrid` / `CalendarEvent`. Civil `YYYY-MM-DDTHH:mm` in, callbacks out. No scheduling engine, no timezone conversion, no persistence.
- **Rejected:** FullCalendar (and similar). It is a product calendar: themes, plugins, recurrence, drag plugins, and a CSS universe that would fight Hatch dashed chrome. It is also a new runtime dependency for every Hatch consumer, including those that only need a week strip.
- **Trade-offs:** Hatch will not grow recurrence, resource lanes, or timezone-aware DST math. Those stay in the host. If a product later needs that surface, it should own FullCalendar (or equivalent) outside this library rather than restyle Hatch to match it.
- **Consequences:** Overlap packing, clipping, multi-day splits, `onSlotSelect`, `onEventChange` (pointer + arrow keys), and `now` are presentation. Documented in HARDENING_REPORT. FullCalendar remains on the “not installed” list in DEPENDENCY_AUDIT.
