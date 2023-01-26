import { TopButton } from '../../components';
import Layout from '../../layout/Layout';
import TagList from './tags-loop-slider/TagList';
import MarqueeLogoCard from './marquee-logo-wall/MarqueeLogoCard';
import LandingTitle from './landing-title/LandingTitle';

const LandingPage = () => {
  return (
    <Layout>
      <MarqueeLogoCard />
      <LandingTitle />
      <TagList />
      <TopButton />
    </Layout>
  );
};
export default LandingPage;
