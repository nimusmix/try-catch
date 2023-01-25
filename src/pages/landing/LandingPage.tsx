import { useEffect } from 'react';
import { Button, TopButton } from '../../components';
import Layout from '../../layout/Layout';
import TagList from './tags-loop-slider/TagList';
import {
  header_qna,
  header_feed,
  header_roadmap,
  header_challenge,
  header_bookmark,
} from '../../assets';

const LandingPage = () => {
  const preload = (urls: string[]) => {
    urls.forEach((url) => {
      const img = new Image();
      img.src = `${url}`;
    });
  };

  useEffect(() => {
    preload([header_qna, header_feed, header_roadmap, header_challenge, header_bookmark]);
  }, []);

  return (
    <Layout>
      <Button margin="20px">하이요</Button>
      <TopButton />
      <TagList />
    </Layout>
  );
};
export default LandingPage;
