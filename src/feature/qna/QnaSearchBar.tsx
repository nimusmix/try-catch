import styled from 'styled-components';
import { IoMdSearch } from 'react-icons/io';
import { useRecoilValue } from 'recoil';
import { Button, Input } from '../../components';
import { isDarkState } from '../../recoil';

// const StyledSearchBar = styled.div`
//   width: '580px';
//   height: '40px';
//   border-radius: '6px';
//   border-width: '20px';
//   border-color: '#adadad';
//   margin: '10px';
//   position: relative;
// `;

const QnaSearchBar = () => {
  const isDark = useRecoilValue(isDarkState);
  return (
    <div style={{ display: 'flex', width: 660 }}>
      <div
        style={{
          width: 580,
          height: 40,
          borderRadius: 6,
          borderWidth: 1,
          borderColor: '#adadad',
          position: 'relative',
          margin: '0 auto',
        }}
      >
        <Input
          width="544px"
          height="38px"
          borderRadius="6px"
          boxShadow="none"
          border="none"
          placeholder="Search..."
        />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            right: '10px',
            transform: 'translateY(-50%)',
          }}
        >
          <IoMdSearch
            color={isDark ? 'var(--colors-black-100)' : 'var(--colors-white-100)'}
            size="20"
          />
        </div>
      </div>
      <Button fontSize="var(--fonts-mobile-heading-xl)">검색</Button>
    </div>
  );
};

export default QnaSearchBar;
