/* This example requires Tailwind CSS v2.0+ */
import { CheckIcon } from '@heroicons/react/outline';

const features = [
  {
    name: 'Insane',
  },
  {
    name: 'Create different ages',
  },
  {
    name: 'Both boys and girls',
  },
  {
    name: 'HD images',
  },
];

export default function Features() {
  return (
    <div>
      <div className='mx-auto max-w-7xl px-4 py-8 text-center sm:px-6 lg:px-8 lg:py-24'>
        <div>
          <h2 className='text-base font-semibold uppercase tracking-wide text-indigo-600'>
            The most accurate predictions
          </h2>
          <p className='text-3xl font-extrabold text-gray-900'>In the World</p>
        </div>
        <div className='mt-8'>
          <dl className='mx-auto flex w-fit flex-col items-start justify-start space-y-4'>
            {features.map((feature) => (
              <div key={feature.name} className='relative'>
                <dt>
                  <CheckIcon
                    className='absolute h-6 w-6 text-green-500'
                    aria-hidden='true'
                  />
                  <p className='ml-9 text-lg font-medium leading-6 text-gray-900'>
                    {feature.name}
                  </p>
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
