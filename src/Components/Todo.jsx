import { useState } from "react";

export default function Todo(){
    const [task, setTask] = useState('');
    const [todo, setTodo] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    const Task = (e) => {
        setTask(e.target.value);
    }
    const addHandler = () => {
        if (task.trim()) {
            setTodo([...todo, task]);
            setSearchResults([...todo, task]); // Update search results as well
            setTask('');
        }
    }
    const deleteTask = (index) => {
        const updatedTodo = todo.filter((item, i) => i !== index);
        setTodo(updatedTodo);
        setSearchResults(updatedTodo); // Update search results as well
    }
    const DeleteAll = () => {
        setTodo([]);
        setSearchResults([]);
        
    }
    const handleSearch = (e) => {
       const query=e.target.value.toLowerCase();
       const filteredData = todo.filter((item) =>{ return item.toLowerCase().includes(query);
    });
    setSearchResults(filteredData);
        
    }

    return (
      <div>
        <h1>Todo</h1>
        <input type="text" name="inputTask" onChange={(e)=>{Task(e)}} placeholder="Add a new todo"/>
        <button onClick={addHandler}>Add</button>
           { todo.length !== 0 &&          <button onClick={DeleteAll}>Delete Tasks</button>
}



        <input type="search" name="taskSearch" onChange={(e)=>{handleSearch(e)}} placeholder="Search a task"/>

        <ul>
            {searchResults.map((item, index) => {
                return <li key={index}>{item} <button onClick={() => { deleteTask(index) }}>x</button></li>
            })}
        </ul>

      </div>
    )
}