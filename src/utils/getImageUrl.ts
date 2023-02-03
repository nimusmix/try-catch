type PathType = '' | 'root' | 'logo' | 'landing' | 'header';
type ExtensionType = 'png' | 'ico' | 'svg' | 'jpg' | 'jpeg';
const getImageUrl = (name: string, path: PathType, extension: ExtensionType) => {
  const defaultImage = new URL(`../assets/favicon.ico`, import.meta.url).href;
  let url;
  switch (path) {
    case 'root':
      url = new URL(`../assets/${name}.${extension}`, import.meta.url);
      if (url.pathname === '/undefined') return defaultImage;
      return url.href;
    case 'header':
      url = new URL(`../assets/header/${name}.${extension}`, import.meta.url);
      if (url.pathname === '/undefined') return defaultImage;
      return url.href;
    case 'landing':
      url = new URL(`../assets/landing/${name}.${extension}`, import.meta.url);
      if (url.pathname === '/undefined') return defaultImage;
      return url.href;
    case 'logo':
      url = new URL(`../assets/logo/${name}.${extension}`, import.meta.url);
      if (url.pathname === '/undefined') return defaultImage;
      return url.href;
    default:
      return new URL(`../assets/${name}.${extension}`, import.meta.url).href;
  }
};

export default getImageUrl;
