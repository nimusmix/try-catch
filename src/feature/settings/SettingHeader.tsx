import { MiniTitle } from '../../components';

interface ISettingHeaderProps {
  title: string;
}

const SettingHeader = ({ title }: ISettingHeaderProps) => {
  return (
    <MiniTitle sizeType="3xl" textAlign="left">
      {title}
    </MiniTitle>
  );
};

export default SettingHeader;
