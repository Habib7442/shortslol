import { useRouter } from 'next/router';

import CTA from '@/components/CTA';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import Testimony from '@/components/Testimony';

export default function Home() {
  const router = useRouter();

  // useEffect(() => {
  //   const { error, error_code, error_description } = router.query;

  //   if (error || error_code || error_description) {
  //     const errorMessage = `Error: ${error}. Code: ${error_code}. Description: ${error_description}. Please contact team@shorts.lol`;
  //     toast.error(errorMessage, {
  //       duration: 10000, // display for 10 seconds
  //     });
  //   }
  // }, [router.query]);

  return (
    <>
      <div>
        <Hero />
        {/* <HowItWorks /> */}
        <HowItWorks />
        <h1 className='bg-gray-50 py-8 text-center text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl'>
          Reviews
        </h1>
        <div className='flex flex-col gap-y-8 bg-gray-50 pb-8'>
          <Testimony
            quote='Ive literally automated my entire business with Shorts.lol'
            imagePath='/images/testimonyOne.png'
            personName='Emily Stark'
          />
          <Testimony
            quote='Shorts.lol saves me hours a day, its crazy'
            imagePath='/images/testimonyTwo.png'
            personName='Ethan Guo'
          />
        </div>
        <FAQ />
        <CTA />
        <Footer />
      </div>
    </>
  );
}
