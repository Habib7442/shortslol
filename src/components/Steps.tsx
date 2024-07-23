import { Step } from '@/pages/create';

type StepsProps = { steps: Step[]; currentStep: number };

export default function Steps({ steps, currentStep }: StepsProps) {
  return (
    <nav className='flex items-center justify-center' aria-label='Progress'>
      <p className='text-sm font-medium'>
        Step {currentStep + 1} of {steps.length}
      </p>
      <ol className='ml-8 flex items-center space-x-5'>
        {steps.map((step) => (
          <li key={step.label}>
            {step.key < currentStep ? (
              <a
                href='#'
                className='block h-2.5 w-2.5 rounded-full bg-indigo-600 hover:bg-indigo-900'
              >
                <span className='sr-only'>{step.label}</span>
              </a>
            ) : step.key === currentStep ? (
              <a
                href='#'
                className='relative flex items-center justify-center'
                aria-current='step'
              >
                <span className='absolute flex h-5 w-5 p-px' aria-hidden='true'>
                  <span className='h-full w-full rounded-full bg-indigo-200' />
                </span>
                <span
                  className='relative block h-2.5 w-2.5 rounded-full bg-indigo-600'
                  aria-hidden='true'
                />
                <span className='sr-only'>{step.label}</span>
              </a>
            ) : (
              <a
                href='#'
                className='block h-2.5 w-2.5 rounded-full bg-gray-200 hover:bg-gray-400'
              >
                <span className='sr-only'>{step.label}</span>
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
