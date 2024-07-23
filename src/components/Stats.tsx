/* This example requires Tailwind CSS v2.0+ */
export default function Stats() {
  return (
    <div className='bg-white pt-12 sm:pt-16'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mx-auto max-w-4xl text-center'>
          <h2 className='text-3xl font-extrabold text-gray-900 sm:text-4xl'>
            It's <span className='text-indigo-600'>s</span>
            <span className='text-indigo-500'>o</span>
            <span className='text-indigo-400'>o</span>
            <span className='text-indigo-300'>o</span> much better than anything
            else
          </h2>
          <p className='mt-3 text-xl text-gray-500 sm:mt-4'>
            And we have the data to back it up
          </p>
        </div>
      </div>
      <div className='pt-10'>
        <div className='relative bg-gray-50'>
          <div className='absolute inset-0 h-1/2 bg-white' />
          <div className='relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
            <div
              className='mx-auto max-w-4xl'
              data-aos='fade-up'
              data-aos-duration='500'
            >
              <dl className='rounded-lg bg-gray-50 shadow-lg sm:grid sm:grid-cols-3'>
                <div className='flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r'>
                  <dt className='order-2 mt-2 text-lg font-medium leading-6 text-gray-500'>
                    Faster than normal
                  </dt>
                  <dd className='order-1 text-5xl font-extrabold text-indigo-600'>
                    10x
                  </dd>
                </div>
                <div className='flex flex-col border-b border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r'>
                  <dt className='order-2 mt-2 text-lg font-medium leading-6 text-gray-500'>
                    Email open rate
                  </dt>
                  <dd className='order-1 text-5xl font-extrabold text-indigo-600'>
                    5.4x
                  </dd>
                </div>
                <div className='flex flex-col border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l'>
                  <dt className='order-2 mt-2 text-lg font-medium leading-6 text-gray-500'>
                    Generation time
                  </dt>
                  <dd className='order-1 text-5xl font-extrabold text-indigo-600'>
                    ~10s
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-gray-50 pb-12 sm:pb-16' />
    </div>
  );
}
