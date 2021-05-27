import "./App.css";

import { useCallback, useEffect, useState } from "react";

import Web3 from "web3";

function App() {
  const [account, setAccount] = useState("");
  const loadBlockchainData = useCallback(async () => {
    const web3 = new Web3("http://localhost:7545");
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
  }, [setAccount]);

  useEffect(() => {
    loadBlockchainData();
  }, [loadBlockchainData]);
  return (
    <div className="container">
      <h1>Hello, World!</h1>
      {account && <p>Your account: {account}</p>}
    </div>
  );
}

export default App;
