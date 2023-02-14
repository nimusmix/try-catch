/* eslint-disable import/no-extraneous-dependencies */
/// <reference types="vitest" />
/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import htmlPlugin, { Options } from 'vite-plugin-html-config';

const DOMAIN =
  process.env.CONTEXT === 'production'
    ? process.env.URL ?? 'https://try-catch.duckdns.org/'
    : process.env.PREVIEW_URL ?? 'https://beta.try-catch.duckdns.org/question';

const CARD_IMAGE_PATH = '/src/assets/thumbnail.png';

const getURL = (path = ''): string => new URL(path, DOMAIN).toString();

const htmlPluginOpt: Options = {
  favicon: new URL(`/src/assets/favicon.ico`, import.meta.url).href,
  metas: [
    {
      name: 'title',
      content: '트라이캐치',
    },
    {
      name: 'description',
      content: '함께 지식과 경험을 공유하며 좋은 개발자로 성장해요!',
    },
    {
      name: 'keywords',
      content: '개발자,SNS,깃허브,질문,스택오버플로우,블로그,기술블로그,챌린지,웹,개발',
    },

    {
      property: 'og:title',
      content: '트라이캐치',
    },
    {
      property: 'og:site_name',
      content: '트라이캐치',
    },
    {
      property: 'og:description',
      content: '개발자,SNS,깃허브,질문,스택오버플로우,블로그,기술블로그,챌린지,웹,개발',
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:image',
      content: new URL(CARD_IMAGE_PATH, import.meta.url).href,
    },
    {
      property: 'og:url',
      content: getURL(),
    },

    {
      name: 'twitter:title',
      content: '트라이캐치',
    },
    {
      name: 'twitter:description',
      content: '',
    },
    {
      name: 'twitter:image',
      content: new URL(CARD_IMAGE_PATH, import.meta.url).href,
    },
  ],
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), htmlPlugin(htmlPluginOpt)],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
  },
});
