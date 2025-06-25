import { LucideBot } from "lucide-react"
import type { LucideProps } from "lucide-react"

/**
 * Named export `Bot` used across the app.
 * Wraps Lucide’s Bot icon so we can standardise future overrides (size, className, etc.).
 */
export function Bot(props: LucideProps) {
  return <LucideBot {...props} />
}
