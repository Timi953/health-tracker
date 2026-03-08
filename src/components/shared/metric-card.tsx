"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { IconTrendingUp, IconTrendingDown } from "@tabler/icons-react"

interface MetricCardProps {
  title: string
  value: string | number
  subtitle?: string
  trend?: { value: number; direction: "up" | "down" }
  icon?: React.ComponentType<{ className?: string }>
}

export function MetricCard({ title, value, subtitle, trend, icon: Icon }: MetricCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardDescription>{title}</CardDescription>
          {Icon && <Icon className="size-4 text-muted-foreground" />}
        </div>
        <CardTitle className="font-heading text-2xl tabular-nums">{value}</CardTitle>
        {trend && (
          <Badge variant="outline" className="w-fit gap-1">
            {trend.direction === "up" ? (
              <IconTrendingUp className="size-3 text-green-accessible" />
            ) : (
              <IconTrendingDown className="size-3 text-destructive" />
            )}
            <span className={trend.direction === "up" ? "text-green-accessible" : "text-destructive"}>
              {trend.value}%
            </span>
          </Badge>
        )}
      </CardHeader>
      {subtitle && (
        <CardFooter>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </CardFooter>
      )}
    </Card>
  )
}
