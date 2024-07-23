import DashboardHeader, {
  NAV_ITEMS,
} from '@/components/headers/dashboardHeader';
import PricingNew from '@/components/pricing/PricingNew';

const Pricing = () => {
  return (
    <div>
      <DashboardHeader activeElement={NAV_ITEMS.PRICING} />
      <PricingNew />
    </div>
  );
};

export default Pricing;
