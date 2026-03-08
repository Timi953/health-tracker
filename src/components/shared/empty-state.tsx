interface EmptyStateProps {
  title: string
  description: string
  icon?: React.ComponentType<{ className?: string }>
}

export function EmptyState({ title, description, icon: Icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
      {Icon && <Icon className="size-10 text-muted-foreground/50" />}
      <h3 className="font-heading text-lg font-semibold text-muted-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
