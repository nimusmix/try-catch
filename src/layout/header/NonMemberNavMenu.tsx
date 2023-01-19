import React from 'react';
import { FaUserCircle } from 'react-icons/all';
import { useRecoilValue } from 'recoil';
import { isDarkState } from '../../recoil';

const NonMemberNavMenu = () => {
  const isDark = useRecoilValue(isDarkState);

  return (
    <>
      {/* <Button designType="blueEmpty">회원가입</Button>
            <Button>로그인</Button> */}
      <FaUserCircle
        color={isDark ? 'var(--colors-white-100)' : 'var(--colors-black-100)'}
        size="24"
      />
    </>
  );
};

export default NonMemberNavMenu;
