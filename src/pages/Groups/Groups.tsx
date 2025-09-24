import { useEffect } from "react";
import { usePage } from "../../context/PageContext";
import { headerIcons } from "../../data/headerIcons";

const Groups = () => {
  const { setPageInfo } = usePage();

  useEffect(() => {
    const groupPage = headerIcons.find((head) => head.namepage === "Groups");
    if (groupPage) {
      setPageInfo({ icon: groupPage.svg, name: groupPage.namepage });
    }
  }, [setPageInfo]);

  return (
    <p>Groups</p>
  );
};

export default Groups;
