// material
import { styled } from '@material-ui/core/styles';
// components
import Page from '../components/Page';
import {
  LandingHero,
  LandingMinimal,
  LandingAdvertisement,
  LandingHugePackElements,
  LandingPricingPlans
} from '../components/_external-pages/landing';
import LandingHugePackElementsTwo from '../components/_external-pages/landing/LandingHugePackElementsTwo';
import { FaqsList } from '../components/_external-pages/faqs';
import Faqs from './Faqs';
// ----------------------------------------------------------------------

const RootStyle = styled(Page)({
  height: '100%'
});

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default
}));

// ----------------------------------------------------------------------

export default function LandingPage() {
  return (
    <RootStyle title="The starting point for your next project | Minimal-UI" id="move_top">
      <LandingHero />
      <ContentStyle>
        <LandingHugePackElements />
        <LandingMinimal />
        {/* <LandingHugePackElementsTwo /> */}
        {/* <LandingAdvertisement /> */}
        {/* <FaqsList /> */}
        {/* <Faqs /> */}
        <LandingPricingPlans />
      </ContentStyle>
    </RootStyle>
  );
}
