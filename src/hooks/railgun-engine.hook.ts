import { useState, useCallback, useEffect } from "react";
import { NetworkName } from "@railgun-community/shared-models";
import {
  initializeEngine,
  loadProvider,
  create0zWalletFromMnemonic,
  getEngine,
  getRailgunAddress,
} from "../services/railgun-web";
import { useAppConfigurations } from "../context/app-configurations.context";

export interface RailgunEngineHookResult {
  isLoading: boolean;
  isInitialized: boolean;
  engine: any;
  create0zWallet: (mnemonic: string) => Promise<any>;
  getRailgunAddress: (railgunWalletID: string) => string;
}

export const useRailgunEngine = (): RailgunEngineHookResult => {
  const { networkProvidersConfig } = useAppConfigurations();

  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [engine, setEngine] = useState<any>();

  useEffect(() => {
    initializeRailgunEngine();
  }, []);

  const initializeRailgunEngine = useCallback(async () => {
    setIsLoading(true);

    await initializeEngine({ poiNodeURLs: [] });
    const provider = networkProvidersConfig[NetworkName.Ethereum];
    await loadProvider(provider, NetworkName.Ethereum, 1000 * 60 * 1000);

    setEngine(getEngine());

    setIsInitialized(true);
    setIsLoading(false);
  }, [networkProvidersConfig]);

  const create0zWallet = useCallback(async (mnemonic: string) => {
    const wallet = await create0zWalletFromMnemonic(mnemonic);
    return wallet;
  }, []);

  return {
    isLoading,
    isInitialized,
    engine,
    create0zWallet,
    getRailgunAddress,
  };
};
