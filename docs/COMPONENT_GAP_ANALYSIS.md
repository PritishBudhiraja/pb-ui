# Component gap analysis

Hatch vs the Epoch-prep catalogue. Dates are civil ISO (`YYYY-MM-DD`) and clock (`HH:mm`). Timezone and “today” stay in the host.

| GPT name                                                                                                               | Hatch today                            | Decision                                |
| ---------------------------------------------------------------------------------------------------------------------- | -------------------------------------- | --------------------------------------- |
| DateRangePicker                                                                                                        | DatePicker is single ISO               | Extend Calendar + new DateRangePicker   |
| DurationPicker                                                                                                         | —                                      | Build                                   |
| TimeRangePicker                                                                                                        | TimePicker is one `HH:mm`              | Compose two TimePickers                 |
| WeekCalendar / TimeGrid / CalendarEvent                                                                                | Calendar is a month grid               | Build custom week grid                  |
| SortableList                                                                                                           | —                                      | Build with dnd-kit                      |
| ResizablePanel / SplitPane                                                                                             | AppShell is fixed columns              | One PanelGroup primitive                |
| CollapsibleSidebar                                                                                                     | Sidebar is always open                 | Extend Sidebar                          |
| InspectorPanel                                                                                                         | Sheet / Surface                        | Thin titled panel                       |
| CodeBlock                                                                                                              | Docs-local `apps/docs/src/ui/code.tsx` | Promote into Hatch                      |
| MarkdownRenderer                                                                                                       | —                                      | react-markdown (no raw HTML)            |
| StreamingText                                                                                                          | —                                      | Presentational                          |
| RichTextEditor                                                                                                         | —                                      | TipTap StarterKit, no journal schema    |
| AIExecutionStatus                                                                                                      | —                                      | Stage list, host owns state             |
| WorkflowStepper / MilestoneStepper                                                                                     | —                                      | Shared stepper internals, two APIs      |
| TimeAllocationBar                                                                                                      | ProgressBar is one series              | Segmented bar                           |
| WeeklyActivityGrid                                                                                                     | CalendarHeatmap is year×day            | Hour×day grid                           |
| ActivityTimeline                                                                                                       | Timeline                               | Thin denser wrapper                     |
| CountdownDisplay                                                                                                       | —                                      | Remaining civil duration                |
| StackedBarChart / AreaChart / DonutChart                                                                               | Intentionally out of core              | Optional `@pritish.budhiraja/ui/charts` |
| FileDropzone                                                                                                           | Input `type=file`                      | Native drop zone                        |
| VirtualList                                                                                                            | —                                      | TanStack Virtual                        |
| SeasonCard, GoalTree, TaskBoard, FocusSession, DailyPlanner, DistractionManager, WeeklyReview, AICoach, AIPlanApproval | —                                      | Stay in Epoch                           |

Do not rebuild Button, Input, Dialog, Calendar (month), DatePicker (single), TimePicker, Sidebar (open), AppShell, Timeline, ProgressBar, CalendarHeatmap.
