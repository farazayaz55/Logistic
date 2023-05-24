import React, { useState, createContext, useContext, ReactNode } from "react";
import { ProSidebarProvider } from "react-pro-sidebar";
import MyProSidebar from "./Sidebar";

interface SidebarContextValue {
  sidebarBackgroundColor?: string;
  setSidebarBackgroundColor?: (color?: string) => void;
  sidebarImage?: string;
  setSidebarImage?: (image?: string) => void;
  sidebarRTL?: boolean;
  setSidebarRTL?: (rtl?: boolean) => void;
}

const SidebarContext = createContext<SidebarContextValue>({});

interface MyProSidebarProviderProps {
  children: ReactNode;
}

export const MyProSidebarProvider = ({
  children,
}: MyProSidebarProviderProps) => {
  const [sidebarRTL, setSidebarRTL] = useState<boolean | undefined>(false);
  const [sidebarBackgroundColor, setSidebarBackgroundColor] =
    useState<string | undefined>();
  const [sidebarImage, setSidebarImage] = useState<string | undefined>();
  return (
    <ProSidebarProvider>
      <SidebarContext.Provider
        value={{
          sidebarBackgroundColor,
          setSidebarBackgroundColor,
          sidebarImage,
          setSidebarImage,
          sidebarRTL,
          setSidebarRTL,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: sidebarRTL ? "row-reverse" : "row",
          }}
        >
          <MyProSidebar />
          {children}
        </div>
      </SidebarContext.Provider>
    </ProSidebarProvider>
  );
};

export const useSidebarContext = () => useContext<SidebarContextValue>(SidebarContext);
