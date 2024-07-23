
/* eslint-disable @next/next/no-img-element */
type TestimonyType = {
  quote: string;
  imagePath: string;
  personName: string;
};

export default function Testimony({
  quote,
  imagePath,
  personName,
}: TestimonyType) {
  return (
    <section className='overflow-hidden bg-gray-50'>
      <div className='relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='relative'>
          <blockquote>
            <footer>
              <div className='md:flex md:items-center md:justify-center'></div>
            </footer>
            <div className='mx-auto mt-6 max-w-3xl text-center text-2xl font-medium leading-9 text-gray-900'>
              <p>“{quote}”</p>
              <div className='mt-3 text-center md:ml-4 md:mt-0 md:flex md:items-center'>
                <p className='w-full text-base font-medium text-gray-900'>
                  {personName}
                </p>
              </div>
            </div>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
