import LoginAccountForm from '@/components/forms/LoginAccount';
import Header from '@/components/layout/Header';

const Login = () => {
  return (
    <>
      <Header />
      <div className='flex h-[85vh] w-full items-center justify-center'>
        <LoginAccountForm />
      </div>
    </>
  );
};

export default Login;
