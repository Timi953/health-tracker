import type { MoodScore } from "@/types"
import { MOOD_EMOJIS, MOOD_LABELS } from "@/lib/constants"

interface MoodIndicatorProps {
  score: MoodScore
  showLabel?: boolean
}

export function MoodIndicator({ score, showLabel = false }: MoodIndicatorProps) {
  return (
    <span className="inline-flex items-center gap-1">
      <span className="text-lg">{MOOD_EMOJIS[score]}</span>
      {showLabel && <span className="text-sm text-muted-foreground">{MOOD_LABELS[score]}</span>}
    </span>
  )
}
