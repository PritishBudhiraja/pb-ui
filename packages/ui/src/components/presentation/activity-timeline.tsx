import { Timeline, TimelineItem } from "../data/timeline"

export interface ActivityItem {
  id: string
  title: string
  meta?: string
  description?: string
}

export interface ActivityTimelineProps {
  items: ActivityItem[]
  className?: string
}

export function ActivityTimeline({ items, className }: ActivityTimelineProps) {
  return (
    <Timeline className={className}>
      {items.map((item) => (
        <TimelineItem key={item.id} title={item.title} meta={item.meta}>
          {item.description}
        </TimelineItem>
      ))}
    </Timeline>
  )
}
