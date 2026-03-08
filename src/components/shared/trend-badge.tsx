import { Badge } from "@/components/ui/badge"
import { IconTrendingUp, IconTrendingDown } from "@tabler/icons-react"

interface TrendBadgeProps {
  value: number
  direction: "up" | "down"
}

export function TrendBadge({ value, direction }: TrendBadgeProps) {
  return (
    <Badge variant="outline" className="gap-1">
      {direction === "up" ? (
        <IconTrendingUp className="size-3 text-green-accessible" />
      ) : (
        <IconTrendingDown className="size-3 text-destructive" />
      )}
      <span className={direction === "up" ? "text-green-accessible" : "text-destructive"}>
        {value}%
      </span>
    </Badge>
  )
}
