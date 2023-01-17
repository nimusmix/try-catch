import Navigation from './Navigation';

export interface ILayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
  return (
    <>
      <Navigation />
      {children}
    </>
  );
};

export default Layout;
