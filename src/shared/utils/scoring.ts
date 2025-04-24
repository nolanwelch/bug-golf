export function calculateScore(
  keystrokes: number,
  editDistance: number
): number {
  // Unweighted sum for now; will want to add weighting later
  return keystrokes + editDistance;
}
