import React, { createContext, useContext } from "react";
import { RailgunConfigurations } from "../models/railgun-configurations";
import { NetworkName } from "@railgun-community/shared-models";
import { useRailgunConfigurations } from "../hooks/railgun-configurations.hook";

const AppConfigurationsContext = createContext<
  | (RailgunConfigurations & {
      supportedNetworks: NetworkName[];
      getInitialQueryParam: <T extends string | null>(paramName: string) => T;
    })
  | null
>(null);

export const useAppConfigurations = () => {
  const context = useContext(AppConfigurationsContext);
  if (!context) {
    throw new Error(
      "useAppConfigurations must be used within a AppConfigurationsProvider"
    );
  }
  return context;
};

export const AppConfigurationsProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { data, isLoading } = useRailgunConfigurations();

  return (
    <AppConfigurationsContext.Provider value={{ ...data }}>
      {isLoading ? null : children}
    </AppConfigurationsContext.Provider>
  );
};
