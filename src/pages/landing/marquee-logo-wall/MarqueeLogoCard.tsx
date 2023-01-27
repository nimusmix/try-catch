/* eslint-disable react/no-array-index-key */
import React from 'react';
import styled, { keyframes } from 'styled-components';
import random from '../../../utils/random';

import {
  ably,
  bankSalad,
  bunjang,
  carrot,
  class101,
  cupang,
  dano,
  delicious,
  dunamu,
  finda,
  fitpet,
  flitto,
  hyper,
  joongna,
  kakao,
  kakaoBank,
  kmong,
  kurly,
  line,
  liner,
  musicow,
  musinsa,
  naver,
  opgg,
  petner,
  publy,
  quota,
  ridi,
  snow,
  socar,
  soomgo,
  sparta,
  spoon,
  tictoccroc,
  toss,
  wadiz,
  yanolja,
  zigbang,
} from '../../../assets';

const images1 = [kakao, naver, ridi, carrot, liner, dunamu, dano, line];

const images2 = [
  kurly,
  musinsa,
  musicow,
  bankSalad,
  bunjang,
  toss,
  soomgo,
  snow,
  spoon,
  socar,
  yanolja,
  ably,
];

const images3 = [
  opgg,
  wadiz,
  delicious,
  class101,
  sparta,
  hyper,
  fitpet,
  finda,
  flitto,
  petner,
  publy,
  quota,
  kmong,
  joongna,
  zigbang,
  tictoccroc,
  cupang,
  kakaoBank,
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
  background: ${({ theme: { isDark } }) =>
    isDark
      ? `linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%)`
      : `linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)`};
  min-height: 340px;
  overflow: hidden;
  position: relative;
  height: 45vh;
  width: 100%;
  margin-bottom: 3rem;
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
