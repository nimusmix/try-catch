import styled from 'styled-components';

const LoadingWrapper = styled.section`
  width: 846px;
  padding: 1rem 2rem;
  margin: 0 auto;
  @keyframes placeHolderShimmer {
    0% {
      background-position: -468px 0;
    }
    100% {
      background-position: 468px 0;
    }
  }

  @keyframes prideShimmer {
    from {
      background-position: top left;
    }
    to {
      background-position: top right;
    }
  }
`;

const LightUI = styled.div`
  animation-duration: 1s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeHolderShimmer;
  animation-timing-function: linear;
  background: #d8d8d8;
  background-image: linear-gradient(to right, #d8d8d8 0%, #bdbdbd 20%, #d8d8d8 40%, #d8d8d8 100%);
  background-repeat: no-repeat;
  background-size: 800px 104px;
  height: 104px;
  position: relative;
`;

const EmptyDiv = styled.div`
  background: ${({ theme }) => theme.bgColor};
  height: 6px;
  left: 0;
  position: absolute;
  right: 0;
`;

const EmptyItem1 = styled(EmptyDiv)`
  height: 100%;
  left: 200px;
  right: auto;
  top: 0;
  width: 34px;
`;
const EmptyItem2 = styled(EmptyDiv)`
  height: 8px;
  left: 208px;
  top: 0;
`;
const EmptyItem3 = styled(EmptyDiv)`
  height: 12px;
  left: 208px;
  top: 36px;
`;
const EmptyItem4 = styled(EmptyDiv)`
  height: 20px;
  left: 208px;
  bottom: 0px;
`;
const EmptyItem5 = styled(EmptyDiv)`
  left: 208px;
  top: 64px;
`;
const EmptyItem6 = styled(EmptyDiv)`
  height: 32px;
  left: 540px;
  top: 8px;
`;

const Skeleton = () => {
  return (
    <LoadingWrapper>
      <LightUI>
        <EmptyItem1 />
        <EmptyItem2 />
        <EmptyItem3 />
        <EmptyItem4 />
        <EmptyItem5 />
        <EmptyItem6 />
      </LightUI>
    </LoadingWrapper>
  );
};

export default Skeleton;
