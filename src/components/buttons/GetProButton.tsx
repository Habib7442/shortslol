import { PaymentType } from '@shortslol/common';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FaCrown } from 'react-icons/fa';
import { ImSpinner2 } from 'react-icons/im';

import { redirectToCheckout } from '@/lib';
import clsxm from '@/lib/clsxm';

import Button from '@/components/buttons/Button';

import { useUser } from '@/contexts';

const GetProButton = ({ isRedirectToCheckout = true }) => {
  const { email, user } = useUser();

  const [proLoading, setProLoading] = useState(false);

  const onGetProClick = () => {
    if (email && user) {
      setProLoading(true);
      if (isRedirectToCheckout) {
        redirectToCheckout(user.id, email, PaymentType.PREMIUM);
      } else {
        location.href = '/pricing';
      }
    } else {
      toast.error('Please login to continue');
    }
  };

  return (
    <Button
      variant='outline'
      onClick={onGetProClick}
      isLoading={proLoading}
      className={clsxm(
        'z-30 flex h-[40px]  w-[120px] items-center justify-center border-0 bg-gradient-to-r from-yellow-400 to-yellow-800 font-bold text-white hover:from-yellow-500 hover:to-yellow-900',
        proLoading &&
          'relative text-transparent transition-none hover:text-transparent disabled:cursor-wait'
      )}
    >
      {proLoading ? (
        <div>
          <ImSpinner2 className='animate-spin fill-white' />
        </div>
      ) : (
        <div className='flex items-center gap-x-2'>
          <p>Get Pro</p>
          <FaCrown />
        </div>
      )}
    </Button>
  );
};

export default GetProButton;
