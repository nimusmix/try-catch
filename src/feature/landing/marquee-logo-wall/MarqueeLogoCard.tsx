/* eslint-disable react/no-array-index-key */
import React from 'react';
import styled, { keyframes } from 'styled-components';
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
  -webkit-animation-duration: 40s;
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
  -webkit-animation-duration: 50s;
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
  -webkit-animation-duration: 60s;
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

const ForeCard = styled(MarqueeCard)<{ image: string }>`
  &:nth-child(1) {
    translate: 1016px 6px;
  }
  &:nth-child(2) {
    translate: 953px -74px;
  }
  &:nth-child(3) {
    translate: 1168px -295px;
  }
  &:nth-child(4) {
    translate: 850px 66px;
  }
  &:nth-child(5) {
    translate: 980px -182px;
  }
  &:nth-child(6) {
    translate: 823px 200px;
  }
  &:nth-child(7) {
    translate: 844px 150px;
  }
  &:nth-child(8) {
    translate: 803px -324px;
  }
`;

const MidCard = styled(MarqueeCard)<{ image: string }>`
  &:nth-child(1) {
    translate: 1216px 112px;
  }
  &:nth-child(2) {
    translate: 1272px -30px;
  }
  &:nth-child(3) {
    translate: 1259px -156px;
  }
  &:nth-child(4) {
    translate: 1364px -243px;
  }
  &:nth-child(5) {
    translate: 1239px -62px;
  }
  &:nth-child(6) {
    translate: 1064px 155px;
  }
  &:nth-child(7) {
    translate: 1369px -90px;
  }
  &:nth-child(8) {
    translate: 1023px -15px;
  }
  &:nth-child(9) {
    translate: 1156px 1px;
  }
  &:nth-child(10) {
    translate: 1336px 50px;
  }
  &:nth-child(11) {
    translate: 1310px -66px;
  }
  &:nth-child(12) {
    translate: 1085px -114px;
  }
`;

const BackCard = styled(MarqueeCard)<{ image: string }>`
  &:nth-child(1) {
    translate: 1476px 382px;
  }
  &:nth-child(2) {
    translate: 1503px -265px;
  }
  &:nth-child(3) {
    translate: 1355px 133px;
  }
  &:nth-child(4) {
    translate: 1583px 298px;
  }
  &:nth-child(5) {
    translate: 1212px -214px;
  }
  &:nth-child(6) {
    translate: 1492px 227px;
  }
  &:nth-child(7) {
    translate: 1103px 5px;
  }
  &:nth-child(8) {
    translate: 1440px 51px;
  }
  &:nth-child(9) {
    translate: 1349px 165px;
  }
  &:nth-child(10) {
    translate: 1340px 295px;
  }
  &:nth-child(11) {
    translate: 1235px -286px;
  }
  &:nth-child(12) {
    translate: 1196px -152px;
  }
  &:nth-child(13) {
    translate: 1279px 241px;
  }
  &:nth-child(14) {
    translate: 1114px -294px;
  }
  &:nth-child(15) {
    translate: 1195px 385px;
  }
  &:nth-child(16) {
    translate: 1557px -226px;
  }
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
          <ForeCard key={i} image={images1[i]} />
        ))}
      </MarqueeForeground>
      <MarqueeMidground className="animated-marquee-container animated-marquee-middleground">
        {[...new Array(12)].map((_, i) => (
          <MidCard key={i} image={images2[i]} />
        ))}
      </MarqueeMidground>
      <MarqueeBackground className="animated-marquee-container animated-marquee-background">
        {[...new Array(16)].map((_, i) => (
          <BackCard key={i} image={images3[i]} />
        ))}
      </MarqueeBackground>
    </MarqueeWrapper>
  );
};

export default MarqueeLogoCard;
