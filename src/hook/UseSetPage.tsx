import { useEffect } from "react";
import { usePage } from "../context/PageContext";
import { headerIcons } from "../data/headerIcons";

export const useSetPageInfo = (namepage: string) => {
    const { setPageInfo } = usePage();

  useEffect(() => {
    const page = headerIcons.find((head) => head.namepage === namepage);
    if (page) {
      setPageInfo({ icon: page.svg, name: page.namepage });
    }
  }, [namepage, setPageInfo]);
};

