type PathType = '' | 'root' | 'logo' | 'landing' | 'header';
type ExtensionType = 'png' | 'ico' | 'svg' | 'jpg' | 'jpeg';

// TODO 디테일한 부분 수정이 필요할듯?
const getImageUrl = (name: string, path: PathType, extension: ExtensionType) => {
  const defaultImage = new URL(`/src/assets/favicon.ico`, import.meta.url).href;

  const isUndefined =
    new URL(`/src/assets/${path}/${name}.${extension}`, import.meta.url).pathname === '/undefined';

  if (!name || isUndefined) {
    return defaultImage;
  }

  switch (path) {
    case 'root':
      return new URL(`/src/assets/${name}.${extension}`, import.meta.url).href;
    case 'header':
      return new URL(`/src/assets/header/${name}.${extension}`, import.meta.url).href;
    case 'landing':
      return new URL(`/src/assets/landing/${name}.${extension}`, import.meta.url).href;
    case 'logo':
      return new URL(`/src/assets/logo/${name}.${extension}`, import.meta.url).href;
    default:
      return defaultImage;
  }
};

export default getImageUrl;
