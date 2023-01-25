import { Button, TopButton } from '../../components';
import Layout from '../../layout/Layout';
import TagList from './tags-loop-slider/TagList';
import Test from './marquee-logo-wall/Test';

const LandingPage = () => {
  return (
    <Layout>
      <Test />
      <Button margin="20px">하이요</Button>
      <TopButton />
      <TagList />
    </Layout>
  );
};
export default LandingPage;
