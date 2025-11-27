interface ProgressBarProps {
  currentStep: number
  totalSteps: number
  steps: { id: number; title: string }[]
}

export function ProgressBar({ currentStep, totalSteps, steps }: ProgressBarProps) {
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100

  return (
    <div className="w-full mb-8">
      {/* Progress indicator */}
      <div className="flex justify-between mb-2">
        {steps.map((step) => (
          <div
            key={step.id}
            className="flex flex-col items-center flex-1"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                step.id < currentStep
                  ? "bg-[#2DD49F] text-white"
                  : step.id === currentStep
                  ? "bg-[#2DD49F] text-white ring-4 ring-[#2DD49F]/20"
                  : "bg-gray-200 text-gray-400"
              }`}
            >
              {step.id < currentStep ? (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                step.id
              )}
            </div>
            <span
              className={`text-xs mt-2 text-center hidden md:block ${
                step.id === currentStep
                  ? "text-[#2DD49F] font-semibold"
                  : "text-gray-500"
              }`}
            >
              {step.title}
            </span>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#2DD49F] to-[#24b685] transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Current step info - mobile */}
      <div className="md:hidden mt-3 text-center">
        <p className="text-sm text-gray-600">
          Etapa <span className="font-semibold text-[#2DD49F]">{currentStep}</span> de {totalSteps}
        </p>
        <p className="text-xs text-gray-500">{steps[currentStep - 1].title}</p>
      </div>
    </div>
  )
}
