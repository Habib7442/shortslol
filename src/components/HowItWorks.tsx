import Image from 'next/image';

import StepOne from '~/images/stepOne.png';
import StepTwo from '~/images/stepTwo.png';

type StepsType = {
  title: string;
};

const HowItWorks = () => {
  const steps: StepsType[] = [
    {
      title: 'Type in a video idea',
    },
    {
      title: 'Download and share your video',
    },
  ];

  return (
    <div className='flex flex-col items-center gap-y-4 bg-white px-4 pb-8 text-center'>
      <p className='mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl'>
        How it works
      </p>
      {steps.map((step, index) => {
        return (
          <div
            key={index}
            className='flex flex-col items-center gap-y-4'
            data-aos='fade-up'
          >
            <h2 className='text-base font-semibold uppercase tracking-wide text-indigo-600'>
              Step {index + 1} - {step.title}
            </h2>
            <Image
              src={index == 0 ? StepOne : StepTwo}
              width={400}
              height={300}
              alt='steps'
              className='rounded-xl border-2'
            />
          </div>
        );
      })}
    </div>
  );
};

export default HowItWorks;
