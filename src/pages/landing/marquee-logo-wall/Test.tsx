/* eslint-disable react/no-array-index-key */
import React from 'react';
import styled, { keyframes } from 'styled-components';
import random from '../../../utils/random';

const images = [
  'src/assets/logo/카카오.png',
  'src/assets/logo/네이버.png',
  'src/assets/logo/리디.png',
  'src/assets/logo/당근마켓.png',
  'src/assets/logo/라이너.png',
  'src/assets/logo/두나무.png',
  'src/assets/logo/다노.png',
  'src/assets/logo/라인.png',
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
  animation: ${slide} 18s linear infinite;
`;

const MarqueeForeground = styled(MarqueeContainer)`
  margin-top: 3em;
  -webkit-animation-duration: 42s;
  width: 300%;
  z-index: 200;

  div {
    height: 200px;
    width: 200px;
    margin-right: 9%;
    opacity: 0.6;
  }
`;

const MarqueeMidground = styled(MarqueeContainer)`
  margin-top: 6rem;
  -webkit-animation-duration: 60s;
  z-index: 100;

  div {
    height: 150px;
    width: 150px;
    margin-right: 2%;
    opacity: 0.3;
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
    opacity: 0.2;
  }
`;

const MarqueeCard = styled.div<{ image: string }>`
  background: #fff;
  float: left;
  margin-top: -2%;
  margin-right: 2%;
  -webkit-transition: opacity 2s ease-out;
  height: 100px;
  position: relative;
  width: 8%;
  //background-image: url('src/assets/logo/카카오.png');
  background-image: url(${({ image }) => image});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  border-radius: var(--borders-radius-base);

  &:hover {
    opacity: 0.8;
  }

  &:nth-child(3n + 3) {
    left: 30%;
    top: 20%;
  }

  &:nth-child(8n + 1) {
    right: 20%;
  }

  &:nth-child(4n + 3) {
    top: 18%;
  }

  &:nth-child(3n + 5) {
    bottom: 10%;
  }

  &:nth-child(3n + 1) {
    visibility: hidden;
  }
`;

const Test = () => {
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
        {[...new Array(10)].map((_, i) => (
          <MarqueeCard key={i} image={images[random(0, 7)]} />
        ))}
      </MarqueeForeground>
      <MarqueeMidground className="animated-marquee-container animated-marquee-middleground">
        {[...new Array(20)].map((_, i) => (
          <MarqueeCard key={i} image={images[random(0, 7)]} />
        ))}
      </MarqueeMidground>
      <MarqueeBackground className="animated-marquee-container animated-marquee-background">
        {[...new Array(30)].map((_, i) => (
          <MarqueeCard key={i} image={images[random(0, 7)]} />
        ))}
      </MarqueeBackground>
    </MarqueeWrapper>
  );
};

export default Test;
