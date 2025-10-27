import { useSelector } from "react-redux";
import "./Header.css";
import type { RootState } from "../../redux/store";

type HeaderProps = {
  className?: string;
};

const Header = ({ className }: HeaderProps) => {
  const { icon, name } = useSelector((state: RootState) => state.page.pageInfo);

  return (
    <div className={className} id="header">
      {icon && <span>{icon}</span>}
      <h2>{name}</h2>
    </div>
  );
};

export default Header;
