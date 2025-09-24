import { createContext, useContext, useState } from "react";
import type { PageContextType, PageInfo } from "../types/PageType";
import type { ReactNode } from "react";


const PageContext = createContext<PageContextType | undefined>(undefined);

export const PageProvider = ({ children }: { children: ReactNode }) => {
  const [pageInfo, setPageInfo] = useState<PageInfo>({
    icon: null,
    name: "",
  });

  return (
    <PageContext.Provider value={{ pageInfo, setPageInfo }}>
      {children}
    </PageContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const usePage = () => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error("usePage debe usarse dentro de PageProvider");
  }
  return context;
};