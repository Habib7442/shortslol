import { TemplateCard } from './templateCard';

export const TemplateStep = ({
  setStep,
  loading,
}: {
  setStep: (step: number) => void;
  loading: boolean;
}) => {
  return (
    <div className='mt-32 grid w-full grid-cols-2 gap-2 sm:mt-0 sm:grid-cols-3'>
      <TemplateCard
        onClick={() => {
          setStep(1);
        }}
        templateName='Reddit Story'
        videoPath='/videos/reddit-demo.mp4'
      />
      <TemplateCard
        onClick={() => {
          setStep(1);
        }}
        templateName='Interesting Fact'
        videoPath='/videos/fact-demo.mp4'
      />
      <div className='col-span-2 flex w-full flex-col sm:col-span-1'>
        <p className='hidden pb-0 sm:invisible sm:block sm:pb-1'>u</p>
        <div className='flex h-full flex-col items-center justify-center rounded-lg border-0 sm:border-2'>
          <p>More coming tomorrow...</p>
        </div>
      </div>
    </div>
  );
};
