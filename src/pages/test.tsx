import DashboardHeader, {
  NAV_ITEMS,
} from '@/components/headers/dashboardHeader';

const Test = () => {
  return (
    <div>
      <DashboardHeader activeElement={NAV_ITEMS.DASHBOARD} />
    </div>
  );
};

export default Test;
