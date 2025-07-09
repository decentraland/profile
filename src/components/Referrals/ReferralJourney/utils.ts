const ANIMATION_DURATION = 800

const SEGMENT_PERCENTAGE = 11.1
const OFFSET = 5

const calculateProgressPercentage = (totalSteps: number, activeStep: number): number => {
  if (totalSteps <= 0) return 0

  // Si activeStep es 0, no hay progreso
  if (activeStep <= 0) {
    return 0
  }

  // Si activeStep es igual o mayor al total de steps, está completo
  if (activeStep >= totalSteps) {
    return totalSteps * SEGMENT_PERCENTAGE
  }

  // Calcular el progreso basado en activeStep
  const basePercentage = (activeStep - 1) * SEGMENT_PERCENTAGE + OFFSET
  return basePercentage
}

export { ANIMATION_DURATION, calculateProgressPercentage }
