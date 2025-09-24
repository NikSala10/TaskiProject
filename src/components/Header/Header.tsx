import type { HeaderProps } from "../../types/HeaderType";

const Header = ({ svg, namepage}: HeaderProps) => {
  return (
    <div className="header">
        <div className="" >
        <span className="icon-head">{svg}</span>
        <span className="name-page">{namepage}</span>
        </div>
    </div>
  );
};

export default Header;