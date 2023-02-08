import { MiniTitle } from '../../components';

interface ISettingHeaderProps {
  title: string;
}

const SettingHeader = ({ title }: ISettingHeaderProps) => {
  return (
    <MiniTitle sizeType="2xl" textAlign="left" fontWeight="600">
      {title}
    </MiniTitle>
  );
};

export default SettingHeader;
