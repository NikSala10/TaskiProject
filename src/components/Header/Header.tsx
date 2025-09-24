import { usePage } from "../../context/PageContext";

type HeaderProps = {
  className?: string;
};

const Header = ({ className }: HeaderProps) => {
  const { pageInfo } = usePage();

  return (
    <div className={className}>
      {pageInfo.icon && <span>{pageInfo.icon}</span>}
      <h2>{pageInfo.name}</h2>
    </div>
  );
};

export default Header;
