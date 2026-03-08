import { IconFlame } from "@tabler/icons-react"

interface StreakCounterProps {
  count: number
  label?: string
}

export function StreakCounter({ count, label = "day streak" }: StreakCounterProps) {
  return (
    <div className={`flex items-center gap-1 ${count > 0 ? "text-primary" : "text-muted-foreground"}`}>
      <IconFlame className="size-4" />
      <span className="font-heading text-sm font-semibold tabular-nums">{count}</span>
      <span className="text-xs">{label}</span>
    </div>
  )
}
