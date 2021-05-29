import "./App.css";

import { TODO_LIST_ABI, TODO_LIST_ADDRESS } from "./config";
import { useCallback, useEffect, useMemo, useState } from "react";

import Web3 from "web3";

function App() {
  const [account, setAccount] = useState("");
  const [tasks, setTasks] = useState([]);
  const [taskCount, setTaskCount] = useState(0);
  const web3 = useMemo(() => {
    return new Web3("http://localhost:7545");
  }, []);

  const todoList = useMemo(() => {
    return new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS);
  }, [web3]);

  const loadAccount = useCallback(async () => {
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
  }, [web3, setAccount]);

  const loadTaskData = useCallback(async () => {
    const taskCount = Number(await todoList.methods.taskCount().call());
    console.log(`taskCount = ${taskCount}`);
    const tasks = await Promise.all(
      [...Array(taskCount).keys()].map(async (id) => {
        console.log(`loading task(${id + 1})`);
        const task = await todoList.methods.tasks(id + 1).call();
        return {
          id: task.id,
          countent: task.content,
          completed: task.completed,
        };
      })
    );
    setTasks(tasks);
    setTaskCount(taskCount);
  }, [todoList, setTasks]);

  useEffect(() => {
    loadAccount();
    loadTaskData();
  }, [loadAccount, loadTaskData]);

  return (
    <div className="container">
      <h1>Hello, World!</h1>
      <div>{account && <p>Your account: {account}</p>}</div>
      <div>taskCount: {taskCount}</div>
      <pre>{JSON.stringify(tasks, null, 2)}</pre>
    </div>
  );
}

export default App;
