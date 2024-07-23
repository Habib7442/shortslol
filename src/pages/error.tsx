import Link from 'next/link';
import { useRouter } from 'next/router';

const Error = () => {
  const router = useRouter();
  const { message } = router.query; // Extracting the message query parameter

  return (
    <div className='mx-4 flex h-screen w-full flex-col items-center justify-center gap-y-4 text-center'>
      <h1>Sorry, there has been an issue</h1>
      <p className='text-gray-500'>Error message: {message}</p>
      <p>Please reach out to team@shorts.lol</p>

      <Link href='/' className='text-blue-400 underline hover:text-blue-600'>
        Go back home
      </Link>
    </div>
  );
};

export default Error;
