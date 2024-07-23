import { CheckIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { ReactNode, useState } from 'react';
import toast, { LoaderIcon } from 'react-hot-toast';
import { FaApple, FaCrown } from 'react-icons/fa';

import { redirectToCheckout } from '@/lib';
import clsxm from '@/lib/clsxm';
import getClientConfig from '@/lib/config/clientConfig';

import { useUser } from '@/contexts';

// Define PaymentType if not imported
enum PaymentType {
  BASIC = 'BASIC',
  STANDARD = 'STANDARD',
  PREMIUM = 'PREMIUM'
}

// Define TOKEN_LIMITS if not imported
const TOKEN_LIMITS = {
  BASIC: 10,
  STANDARD: 50,
  PREMIUM: 'Unlimited'
};

type LoadingState = {
  [key: string]: boolean;
};

type PricingTier = {
  paymentType: PaymentType;
  title: string;
  price: number;
  was: number;
  cta: string | ReactNode;
  mostPopular: boolean;
  onClick: () => void;
  description: string;
  features: (string | ReactNode)[];
};

declare global {
  interface Window {
    ApplePaySession: any;
  }
}

const hasApplePay = () => {
  if (typeof window === 'undefined') return false;
  if (!window.ApplePaySession) return false;
  return true;
};

export default function Pricing() {
  const { email, user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState<LoadingState>({
    Basic: false,
    Plus: false,
    Premium: false,
  });
  const [discountCodeToggle, setDiscountCodeToggle] = useState(false);
  const [discountCode, setDiscountCode] = useState('');

  const onClick = async (
    paymentType: PaymentType,
    passedDiscountCode?: string
  ) => {
    const tier = pricing.find((tier) => tier.paymentType === paymentType);

    if (!tier) return;

    if (!user?.email || !user?.id) {
      toast.error('Please add your email on the home page');
      return;
    }

    await redirectToCheckout(
      user.id,
      user.email,
      tier.paymentType,
      passedDiscountCode
    );

    setLoading((prevState) => ({
      ...prevState,
      [tier.title]: false,
    }));
  };

  const pricing: PricingTier[] = [
    {
      paymentType: PaymentType.BASIC,
      title: 'Basic',
      price: 19,
      was: 40,
      description: 'Our most basic features.',
      features: [
        `${TOKEN_LIMITS.BASIC} videos (per month)`,
        'No watermark',
        'Standard generation speed',
        'Discord bot access',
      ],
      cta: 'Subscribe',
      mostPopular: false,
      onClick: () => {
        onClick(PaymentType.BASIC);
      },
    },
    {
      paymentType: PaymentType.STANDARD,
      title: 'Standard',
      price: 39,
      was: 100,
      description: 'A plan for those who want the best results.',
      features: [
        <span key='1' className='font-bold'>
          Everything from basic +
        </span>,
        `${TOKEN_LIMITS.STANDARD} videos (per month)`,
        'Fast generation speed',
        'Early access to new features',
      ],
      cta: 'Subscribe',
      mostPopular: true,
      onClick: () => {
        onClick(PaymentType.STANDARD);
      },
    },
    {
      paymentType: PaymentType.PREMIUM,
      title: 'Premium',
      price: 99,
      was: 200,
      description: 'Create anything, GOD MODE!',
      features: [
        <span key='1' className='font-bold'>
          Everything from Plus and...
        </span>,
        'Unlimited video credits',
        'Hyper fast video generation',
        'Custom features',
        'Invite to private discord (massive influencers)',
      ],
      cta: (
        <span className='mx-auto flex w-fit items-center gap-x-2'>
          Get premium <FaCrown />
        </span>
      ),
      mostPopular: false,
      onClick: () => {
        onClick(PaymentType.PREMIUM);
      },
    },
  ];

  return (
    <div className='mx-auto flex max-w-7xl flex-col gap-y-4 px-4 py-16 sm:px-6 lg:px-8'>
      <h2 className='text-3xl font-extrabold text-gray-900 sm:text-5xl sm:leading-none sm:tracking-tight lg:text-6xl'>
        Create videos in seconds ⚡️
      </h2>
      <p className='max-w-2xl text-xl text-gray-500'>
        Plans for everyone, whether you are a small creator or enterpise.
      </p>

      <button
        onClick={() => {
          setDiscountCodeToggle(true);
        }}
        className='text-left text-xl text-indigo-600 underline'
      >
        I have a discount code
      </button>

      {discountCodeToggle && (
        <div className='flex flex-col gap-y-4'>
          <input
            className='rounded-md border border-gray-300 p-2'
            placeholder='Discount code'
            value={discountCode}
            onChange={(e) => {
              setDiscountCode(e.target.value);
            }}
          />
          <button
            type='button'
            onClick={async () => {
              if (
                discountCode === getClientConfig().premiumDiscountCode &&
                email
              ) {
                router.push('/success');
              } else {
                onClick(PaymentType.PREMIUM, discountCode);
              }
            }}
            className='rounded-md bg-indigo-600 p-2 text-white'
          >
            Apply
          </button>
        </div>
      )}

      {/* Tiers */}
      <div className='mt-4 space-y-8 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:space-y-0'>
        {pricing.map((tier) => (
          <div
            key={tier.title}
            className={clsxm(
              'relative flex flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-sm',
              tier.paymentType === PaymentType.PREMIUM && 'bg-black'
            )}
          >
            {(tier.paymentType === PaymentType.STANDARD ||
              tier.paymentType === PaymentType.PREMIUM) && (
              <div
                className='absolute inset-0 z-[-1] rotate-180 rounded-xl opacity-70 blur-lg filter transition-all duration-1000'
                style={{
                  background:
                    'linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)',
                }}
              ></div>
            )}
            <div className='z-30 flex-1'>
              <h3
                className={clsxm(
                  'text-xl font-semibold text-gray-900',
                  tier.paymentType === PaymentType.PREMIUM && 'text-[#FFD700]'
                )}
              >
                {tier.title}
              </h3>
              {tier.mostPopular ? (
                <p className='absolute top-0 -translate-y-1/2 transform rounded-full bg-indigo-500 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white'>
                  Most popular
                </p>
              ) : null}
              <div className='mt-4 flex w-fit items-center gap-x-2'>
                <p
                  className={clsxm(
                    'flex items-baseline text-gray-900',
                    tier.paymentType === PaymentType.PREMIUM && 'text-[#FFD700]'
                  )}
                >
                  <span className='text-5xl font-extrabold tracking-tight'>
                    ${tier.price}
                  </span>
                </p>
                <p className='text-5xl font-extrabold tracking-tight text-gray-400 line-through decoration-gray-500'>
                  ${tier.was}
                </p>
              </div>
              <span className='text-gray-500'>Monthly</span>
              <p
                className={clsxm(
                  'mt-6 text-gray-500',
                  tier.paymentType === PaymentType.PREMIUM && 'text-[#FFD700]'
                )}
              >
                {tier.description}
              </p>

              {/* Feature list */}
              <ul role='list' className='mt-6 space-y-2'>
                {tier.features.map((feature, index) => (
                  <li key={index} className='flex'>
                    <CheckIcon
                      className={clsxm(
                        'h-6 w-6 flex-shrink-0 text-indigo-500',
                        tier.paymentType === PaymentType.PREMIUM &&
                          'text-[#FFD700]'
                      )}
                      aria-hidden='true'
                    />
                    <span
                      className={clsxm(
                        'ml-3 text-gray-500',
                        tier.paymentType === PaymentType.PREMIUM &&
                          'text-gray-400'
                      )}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => {
                setLoading((prevState) => ({
                  ...prevState,
                  [tier.title]: true,
                }));
                tier.onClick();
              }}
              className={clsxm(
                tier.mostPopular
                  ? 'bg-indigo-500 text-white hover:bg-indigo-600'
                  : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100',
                'mt-8 block w-full rounded-md border border-transparent px-6 py-3 text-center font-bold uppercase',
                hasApplePay() && 'bg-black text-white',
                tier.paymentType === PaymentType.PREMIUM &&
                  'bg-[#FFD700] text-black'
              )}
            >
              {loading[tier.title] ? (
                <LoaderIcon className='mx-auto' />
              ) : hasApplePay() ? (
                <div className='flex items-center justify-center gap-x-1'>
                  <FaApple />
                  <p>pay</p>
                </div>
              ) : (
                tier.cta
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}