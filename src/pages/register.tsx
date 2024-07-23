import { useRouter } from 'next/router';

import CreateAccount from '@/components/forms/CreateAccount';
import Header from '@/components/layout/Header';

const Register = () => {
  const router = useRouter();
  const { email } = router.query;

  return (
    <>
      <Header />
      <div className='flex h-[85vh] w-full items-center justify-center'>
        <CreateAccount passedEmail={email && String(email)} />
      </div>
    </>
  );
};

export default Register;
