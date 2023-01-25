import { Button, TopButton } from '../../components';
import Layout from '../../layout/Layout';
import TagList from './tags-loop-slider/TagList';

const LandingPage = () => {
  return (
    <Layout>
      <Button margin="20px">하이요</Button>
      <TopButton />
      <TagList />
    </Layout>
  );
};
export default LandingPage;
