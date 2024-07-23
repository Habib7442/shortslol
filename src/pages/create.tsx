import React, { ReactNode, useState } from 'react';

import DashboardHeader, {
  NAV_ITEMS,
} from '@/components/headers/dashboardHeader';

import CreateForm from '@/components/forms/create';

export type Step = {
  key: number;
  value: ReactNode;
  label: string;
};

const Create: React.FC = () => {
  return (
    <div className='pb-16 text-center'>
      <DashboardHeader activeElement={NAV_ITEMS.CREATE} />
      <div className='w-full'>
        <div
          className='mx-auto mt-4 flex w-full flex-col gap-y-2'
          data-aos='fade-up'
          data-aos-duration='500'
        >
          <CreateForm />
        </div>
      </div>
    </div>
  );
};

export default Create;
