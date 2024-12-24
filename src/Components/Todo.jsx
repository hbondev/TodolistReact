import { useState } from "react";

export default function Todo(){
    const [task, setTask] = useState('');
    const [todo, setTodo] = useState([]);
    const [todoUpdate, setTodoUpdate] = useState([]);

    const Task = (e) => {
        setTask(e.target.value);
    }
    const addHandler = () => {
        setTodo([...todo,task]);
    }
    const deletTask = (index) => {
        console.log(index);
        setTodo([...todo.filter((item,i)=>i!==index)]);
    }

    return (
      <div>
        <h1>Todo</h1>
        <input type="text" name="inputTask" onChange={(e)=>{Task(e)}} placeholder="Add a new todo"/>
        <button onClick={addHandler}>Add</button>



        <ul>
            {todo.map((item,index)=>{
                return <li key={index}>{item} <button onClick={()=>{deletTask(index)}}>x</button></li>
            })}
        </ul>

      </div>
    )
}