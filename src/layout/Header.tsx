interface IHeaderProps {
  children: React.ReactNode;
}

const Header = ({ children }: IHeaderProps) => {
  return <div>{children}</div>;
};

export default Header;
