import "./App.css";

import { TODO_LIST_ABI, TODO_LIST_ADDRESS } from "./config";
import { useCallback, useEffect, useMemo, useState } from "react";

import Web3 from "web3";

function App() {
  const [account, setAccount] = useState("");
  const [todoList, setTodoList] = useState(null);
  const [taskCount, setTaskCount] = useState(0);
  const web3 = useMemo(() => {
    return new Web3("http://localhost:7545");
  });
  const loadBlockchainData = useCallback(async () => {
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
  }, [web3, setAccount]);

  useEffect(() => {
    const init = async () => {
      const todoList = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS);
      const taskCount = await todoList.methods.taskCount().call();
      setTodoList(todoList);
      setTaskCount(taskCount);
    };
    init();
  }, [web3]);

  useEffect(() => {
    loadBlockchainData();
  }, [loadBlockchainData]);
  return (
    <div className="container">
      <h1>Hello, World!</h1>
      <div>{account && <p>Your account: {account}</p>}</div>
      <div>taskCount: {taskCount}</div>
    </div>
  );
}

export default App;
