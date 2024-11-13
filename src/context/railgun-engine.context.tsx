import React, { createContext, useContext, ReactNode } from "react";
import {
  useRailgunEngine,
  RailgunEngineHookResult,
} from "../hooks/railgun-engine.hook";

const RailgunEngineContext = createContext<RailgunEngineHookResult>(undefined);

export const useRailgunEngineContext = () => {
  const context = useContext(RailgunEngineContext);
  if (context === undefined) {
    throw new Error(
      "useRailgunEngineContext must be used within a RailgunEngineProvider"
    );
  }
  return context;
};

export const RailgunEngineProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const railgunEngine = useRailgunEngine();

  return (
    <RailgunEngineContext.Provider value={railgunEngine}>
      {children}
    </RailgunEngineContext.Provider>
  );
};
