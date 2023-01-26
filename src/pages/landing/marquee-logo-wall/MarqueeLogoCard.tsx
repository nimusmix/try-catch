/* eslint-disable react/no-array-index-key */
import React from 'react';
import styled, { keyframes } from 'styled-components';
import random from '../../../utils/random';

const images1 = [
  'src/assets/logo/카카오.png',
  'src/assets/logo/네이버.png',
  'src/assets/logo/리디.png',
  'src/assets/logo/당근마켓.png',
  'src/assets/logo/라이너.png',
  'src/assets/logo/두나무.png',
  'src/assets/logo/다노.png',
  'src/assets/logo/라인.png',
];

const images2 = [
  'src/assets/logo/마켓컬리.png',
  'src/assets/logo/무신사.png',
  'src/assets/logo/뮤직카우.png',
  'src/assets/logo/뱅크샐러드.png',
  'src/assets/logo/번개장터.png',
  'src/assets/logo/비바리퍼블리카.png',
  'src/assets/logo/숨고.png',
  'src/assets/logo/스노우.png',
  'src/assets/logo/스푼.png',
  'src/assets/logo/쏘카.png',
  'src/assets/logo/야놀자.png',
  'src/assets/logo/에이블리.png',
];

const images3 = [
  'src/assets/logo/오피지지.png',
  'src/assets/logo/와디즈.png',
  'src/assets/logo/의식주컴퍼니.png',
  'src/assets/logo/클래스101.png',
  'src/assets/logo/팀스파르타.png',
  'src/assets/logo/하이퍼커넥트.png',
  'src/assets/logo/핏펫.png',
  'src/assets/logo/핀다.png',
  'src/assets/logo/플리토.png',
  'src/assets/logo/펫트너.png',
  'src/assets/logo/퍼블리.png',
  'src/assets/logo/쿼타랩.png',
  'src/assets/logo/크몽.png',
  'src/assets/logo/중고나라.png',
  'src/assets/logo/직방.png',
  'src/assets/logo/째깍악어.png',
  'src/assets/logo/쿠팡.png',
  'src/assets/logo/카카오뱅크.png',
];

const slide = keyframes`
  0% {
    transform: rotate(-22deg) skewX(-22.5deg) translate3d(-100%, 0, 0);
    opacity: 0;
  }
  5% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
  85% {
    opacity: 1;
  }
  100% {
    transform: rotate(-22deg) skewX(-22.5deg) translate3d(25%, 0, 0);
    opacity: 0;
  }
`;

const MarqueeWrapper = styled.div`
  background: #1697e0;
  margin: 0 auto;
  min-height: 340px;
  overflow: hidden;
  position: relative;
  height: 60%;
  width: 100%;
`;

const MarqueeContainer = styled.div`
  position: absolute;
  top: -75%;
  width: 200%;
  animation: ${slide} 12s linear infinite;
`;

const MarqueeForeground = styled(MarqueeContainer)`
  margin-top: 3rem;
  -webkit-animation-duration: 48s;
  width: 300%;
  z-index: 5;

  div {
    height: 180px;
    width: 180px;
    margin-right: 9%;
    opacity: 0.7;
  }
`;

const MarqueeMidground = styled(MarqueeContainer)`
  margin-top: 6rem;
  -webkit-animation-duration: 68s;
  z-index: 6;

  div {
    height: 130px;
    width: 130px;
    margin-right: 2%;
    opacity: 0.6;
  }
`;

const MarqueeBackground = styled(MarqueeContainer)`
  margin-top: 3rem;
  -webkit-animation-delay: 250ms;
  -webkit-animation-duration: 100s;
  z-index: 0;

  div {
    height: 100px;
    width: 100px;
    margin-right: 1%;
    margin-top: 1%;
    opacity: 0.5;
  }
`;

const MarqueeCard = styled.div<{ image: string }>`
  background-color: #fff;
  float: left;
  margin-top: -2%;
  margin-right: 2%;
  -webkit-transition: opacity 2s ease-out;
  height: 100px;
  position: relative;
  width: 8%;
  border-radius: var(--borders-radius-base);
  background-image: url(${({ image }) => image});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  transition: all 3s ease;
  &:hover {
    opacity: 1;
    scale: 1.01;
  }
`;

const ForeCard = styled(MarqueeCard)<{ image: string; x: number; y: number }>`
  transform: translate(${({ x }) => x}px, ${({ y }) => y}px);
`;

const MidCard = styled(MarqueeCard)<{ image: string; x: number; y: number }>`
  transform: translate(${({ x }) => x}px, ${({ y }) => y}px);
`;

const BackCard = styled(MarqueeCard)<{ image: string; x: number; y: number }>`
  transform: translate(${({ x }) => x}px, ${({ y }) => y}px);
`;

const MarqueeLogoCard = () => {
  /*
  var animatedMarquee = $('.animated-marquee');

$(window).resize(function(){
  animatedMarquee.remove();
  $('body').append(animatedMarquee);
});
  * */
  return (
    <MarqueeWrapper>
      <MarqueeForeground>
        {[...new Array(8)].map((_, i) => (
          <ForeCard key={i} image={images1[i]} x={random(800, 1200)} y={random(-400, 100)} />
        ))}
      </MarqueeForeground>
      <MarqueeMidground className="animated-marquee-container animated-marquee-middleground">
        {[...new Array(12)].map((_, i) => (
          <MidCard key={i} image={images2[i]} x={random(1000, 1400)} y={random(-300, 200)} />
        ))}
      </MarqueeMidground>
      <MarqueeBackground className="animated-marquee-container animated-marquee-background">
        {[...new Array(16)].map((_, i) => (
          <BackCard key={i} image={images3[i]} x={random(1100, 1600)} y={random(-500, 200)} />
        ))}
      </MarqueeBackground>
    </MarqueeWrapper>
  );
};

export default MarqueeLogoCard;
