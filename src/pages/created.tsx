import { useRouter } from 'next/router';

import Header from '@/components/layout/Header';

const Created = () => {
  const router = useRouter();

  return (
    <>
      <Header />
      <div className='mx-2 flex h-[85vh] flex-col items-center justify-center gap-y-2 text-center'>
        <h1>Generating photos! 👩‍💻</h1>
        <p>
          Congrats! 🎉 You will recieve an email with your results in the next
          24 hours!
        </p>
        <p className='my-4 text-center text-gray-500'>
          Any issues please reach out to team@shorts.lol
        </p>
        <button
          onClick={() => router.push('/dashboard')}
          className='mx-auto mt-4 w-fit rounded-lg border-2 bg-indigo-400 px-3 py-2 font-bold text-white hover:bg-indigo-500'
        >
          Back to dashboard
        </button>
      </div>
    </>
  );
};

export default Created;
