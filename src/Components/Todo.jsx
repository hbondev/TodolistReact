import { useState } from "react";

export default function Todo() {
    const [task, setTask] = useState('');
    const [todo, setTodo] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]); // Array to track completed tasks



    const Task = (e) => {
        setTask(e.target.value);
    }
    const addHandler = () => {
        if (task.trim() !== "") {
            console.log(task, task.trim());

            setTodo((prevTodo) => {
                const updatedTodo = [...prevTodo, task];
                setSearchResults(updatedTodo); // Update search results as well
                return updatedTodo;
            });
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
        const query = e.target.value.toLowerCase();
        const filteredData = todo.filter((item) => {
            return item.toLowerCase().includes(query);
        });
        setSearchResults(filteredData);

    }
    const isCompleted = (e, index) => {
        const updatedCompletedTasks = [...completedTasks];
        updatedCompletedTasks[index] = e.target.checked; // Update completion status for the specific task
        setCompletedTasks(updatedCompletedTasks);
    }
    return (
        <div>
            <h1>Todo</h1>
            <input type="text" name="inputTask" onChange={(e) => { Task(e) }} placeholder="Add a new todo" />
            <button onClick={addHandler}>Add</button>
            {todo.length !== 0 && <button onClick={DeleteAll}>Delete Tasks</button>
            }



            <input type="search" name="taskSearch" onChange={(e) => { handleSearch(e) }} placeholder="Search a task" />

            <ul>
                {searchResults.map((item, index) => {
                    return <li key={index} className={completedTasks[index] ? 'completed' : 'todo'} checked={completedTasks[index]}><input type="checkbox" onChange={(e) => { isCompleted(e, index) }} />{item} <button onClick={() => { deleteTask(index) }}>x</button></li>
                })}
            </ul>

        </div>
    )
}