import type { ReactNode } from "react"; 

export type PageInfo = {
  icon: ReactNode;
  name: string;
};

export type PageContextType = {
  pageInfo: PageInfo;
  setPageInfo: (info: PageInfo) => void;
};