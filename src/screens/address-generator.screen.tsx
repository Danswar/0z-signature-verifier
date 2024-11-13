import React, { useState } from "react";
import { Wallet, toUtf8Bytes } from "ethers";
import { useRailgunEngine } from "../hooks/railgun-engine.hook";
import { fullWalletForID } from "@railgun-community/wallet";
import RailgunWallet from "@railgun-community/wallet";
import { RailgunEngine, verifyED25519 } from "@railgun-community/engine";

const AddressGenerator: React.FC = () => {
  const { isLoading, create0zWallet, getRailgunAddress, engine } =
    useRailgunEngine();
  const [address, setAddress] = useState("");
  const [mnemonic, setMnemonic] = useState("");
  const [railgunAddress, setRailgunAddress] = useState("");
  const [railgunWallet, setRailgunWallet] = useState<any>(null);

  const [message, setMessage] = useState("hello world");
  const [signature, setSignature] = useState("");

  const [addressToVerify, setAddressToVerify] = useState("");
  const [messageToVerify, setMessageToVerify] = useState("hello world");
  const [signatureToVerify, setSignatureToVerify] = useState("");
  const [result, setResult] = useState<string | boolean>("");

  const generateAddress = async () => {
    const wallet = Wallet.createRandom();
    setAddress(wallet.address);
    setMnemonic(wallet.mnemonic.phrase);
    const walletInfo = await create0zWallet(wallet.mnemonic.phrase);
    setRailgunAddress(getRailgunAddress(walletInfo.id));
    const fullWallet = fullWalletForID(walletInfo.id);
    setRailgunWallet(fullWallet);
    fullWallet.signWithViewingKey;
  };

  const signMessage = async () => {
    if (!railgunWallet) return;
    const signatureBytes = await railgunWallet.signWithViewingKey(
      toUtf8Bytes(message)
    );
    console.log(signatureBytes);
    const signatureHex = Buffer.from(signatureBytes).toString("hex");
    setSignature(signatureHex);
  };

  const verifySignature = async () => {
    const decodedAddress = RailgunEngine.decodeAddress(addressToVerify);
    const signatureBytes = new Uint8Array(
      Buffer.from(signatureToVerify, "hex")
    );
    const messageBytes = toUtf8Bytes(messageToVerify);
    console.log(messageBytes);
    const result = await verifyED25519(
      messageBytes,
      signatureBytes,
      decodedAddress.viewingPublicKey
    ).catch((e) => {
      console.error(e);
      return "false";
    });
    console.log(result);
    setResult(result.toString());
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
      <div className="bg-white rounded-lg shadow p-6 mt-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
          onClick={signMessage}
        >
          Sign Message
        </button>
        <p className="text-gray-600">Message to sign:</p>
        <textarea
          className="w-full p-2 border rounded mt-2"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          placeholder="Enter message to sign..."
        />
        <p className="text-gray-600">Signature:</p>
        <code className="block bg-gray-100 p-2 mt-2 rounded break-all">
          {signature}
        </code>
      </div>
      <div className="bg-white rounded-lg shadow p-6 mt-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
          onClick={verifySignature}
        >
          Verify Signature
        </button>
        <p className="text-gray-600">0z Address:</p>
        <textarea
          className="w-full p-2 border rounded mt-2"
          value={addressToVerify}
          onChange={(e) => setAddressToVerify(e.target.value)}
          rows={2}
          placeholder="Enter 0z address..."
        />
        <p className="text-gray-600">Message to verify:</p>
        <textarea
          className="w-full p-2 border rounded mt-2"
          value={messageToVerify}
          onChange={(e) => setMessageToVerify(e.target.value)}
          rows={4}
          placeholder="Enter message to verify..."
        />
        <p className="text-gray-600">Signature to verify:</p>
        <textarea
          className="w-full p-2 border rounded mt-2"
          value={signatureToVerify}
          onChange={(e) => setSignatureToVerify(e.target.value)}
          rows={4}
          placeholder="Enter signature to verify..."
        />
        <p className="text-gray-600">Result:</p>
        <code className="block bg-gray-100 p-2 mt-2 rounded break-all">
          {result}
        </code>
      </div>
    </div>
  );
};

export default AddressGenerator;
