import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageInfo } from "../redux/slices/pageSlice";
import { headerIcons } from "../data/headerIcons";

export const useSetPageInfo = (namepage: string) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const page = headerIcons.find((head) => head.namepage === namepage);
    if (page) {
      dispatch(setPageInfo({ icon: page.svg, name: page.namepage }));
    }
  }, [namepage, dispatch]);
};
