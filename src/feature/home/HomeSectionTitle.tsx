import { MiniTitle } from '../../components';

interface IHomeSectionHeaderProps {
  title: string;
}

const HomeSectionTitle = ({ title }: IHomeSectionHeaderProps) => {
  return (
    <MiniTitle
      sizeType="xl"
      textAlign="left"
      style={{ marginBottom: '1.4rem', fontWeight: 'bold' }}
    >
      {title}
    </MiniTitle>
  );
};

export default HomeSectionTitle;
