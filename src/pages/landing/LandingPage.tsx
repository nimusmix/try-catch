import { TopButton } from '../../components';
import Layout from '../../layout/Layout';
import TagList from './tags-loop-slider/TagList';
import MarqueeLogoCard from './marquee-logo-wall/MarqueeLogoCard';

const LandingPage = () => {
  return (
    <Layout>
      <MarqueeLogoCard />
      <TagList />
      <TopButton />
    </Layout>
  );
};
export default LandingPage;
