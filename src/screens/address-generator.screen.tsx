import React, { useState } from "react";
import { Wallet } from "ethers";
import { useRailgunEngine } from "../hooks/railgun-engine.hook";

const AddressGenerator: React.FC = () => {
  const { isLoading, create0zWallet, getRailgunAddress } = useRailgunEngine();
  const [address, setAddress] = useState("");
  const [mnemonic, setMnemonic] = useState("");
  const [railgunAddress, setRailgunAddress] = useState("");

  const generateAddress = async () => {
    const wallet = Wallet.createRandom();
    setAddress(wallet.address);
    setMnemonic(wallet.mnemonic.phrase);
    const walletInfo = await create0zWallet(wallet.mnemonic.phrase);
    setRailgunAddress(getRailgunAddress(walletInfo.id));
  };

  return (
    <div className="p-4">
      <div className="bg-white rounded-lg shadow p-6">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={generateAddress}
            >
              Generate Random Address
            </button>
            <div className="mt-4">
              <p className="text-gray-600">Mnemonic:</p>
              <code className="block bg-gray-100 p-2 mt-2 rounded">
                {mnemonic}
              </code>
            </div>
            <div className="mt-4">
              <p className="text-gray-600">0x Address:</p>
              <code className="block bg-gray-100 p-2 mt-2 rounded">
                {address}
              </code>
            </div>
            <div className="mt-4">
              <p className="text-gray-600">0z Address:</p>
              <code className="block bg-gray-100 p-2 mt-2 rounded break-all">
                {railgunAddress}
              </code>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AddressGenerator;
