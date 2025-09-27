import { usePage } from "../../context/PageContext";
import "./Header.css";

type HeaderProps = {
  className?: string;
};

const Header = ({ className }: HeaderProps) => {
  const { pageInfo } = usePage();

  return (
    <div className={className} id="header">
      {pageInfo.icon && <span>{pageInfo.icon}</span>}
      <h2>{pageInfo.name}</h2>
    </div>
  );
};

export default Header;
