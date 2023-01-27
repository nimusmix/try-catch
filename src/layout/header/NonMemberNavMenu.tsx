import { useRecoilValue } from 'recoil';
import { IconUserCircle } from '../../components/icons/Icons';
import { isDarkState } from '../../recoil';

const NonMemberNavMenu = () => {
  const isDark = useRecoilValue(isDarkState);

  return (
    <>
      {/* <Button designType="blueEmpty">회원가입</Button>
            <Button>로그인</Button> */}
      <IconUserCircle
        color={isDark ? 'var(--colors-white-100)' : 'var(--colors-black-100)'}
        size="24"
      />
    </>
  );
};

export default NonMemberNavMenu;
