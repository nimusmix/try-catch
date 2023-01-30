type PathType = '' | 'root' | 'logo' | 'landing' | 'header';
const getImageUrl = (name: string, path: PathType) => {
  switch (path) {
    case 'root':
      return new URL(`../assets/${name}.png`, import.meta.url).href;
    case 'header':
      return new URL(`../assets/header/${name}.png`, import.meta.url).href;
    case 'landing':
      return new URL(`../assets/landing/${name}.png`, import.meta.url).href;
    case 'logo':
      return new URL(`../assets/logo/${name}.png`, import.meta.url).href;
    default:
      return new URL(`../assets/${name}.png`, import.meta.url).href;
  }
};

export default getImageUrl;
