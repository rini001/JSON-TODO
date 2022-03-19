import React, { useEffect, useState } from 'react'
import styles from './Todo.module.css'
export const Todo = () => {
    const [inputValue,setInputValue]=useState("")
    const [todos,setTodos]=useState([])
    useEffect(()=>{
        getTodos()
    },[])
    const getTodos=()=>{
        fetch(`http://localhost:8000/todos`)
        .then((res)=>res.json())
        .then((res)=>setTodos(res))
        .catch((err)=>console.log(err))
    }
    const handleAdd =()=>{
        console.log(inputValue);
        const payload={
            title:inputValue,
            status:false
        };
        const payloadjson=JSON.stringify(payload)
        fetch(`http://localhost:8000/todos`,{
        method:"POST",
        body:payloadjson,
        headers:{
            "content-type":"application/json"
        }
        })
        .then((res)=>res.json())
        .then((json)=>{
            getTodos()
        })
    }
    const handleDelete= (id)=>{
        fetch(`http://localhost:8000/todos/${id}`,{
        method:"DELETE",
        headers:{
            "content-type":"application/json"
        }
        })
        .then((res)=>res.json())
        .then((json)=>{
            getTodos()
        })
		const removeItem = todos.filter((el) => {
		  return el.id !== id;
		});
        // console.log(removeItem)
	    setTodos(removeItem);
	}
  return (
    <div>
        <input placeholder='ADD TODOS'
        value={inputValue}
        onChange={(e)=>setInputValue(e.target.value)}
        />
        <button onClick={handleAdd}>ADD</button>
        {
            todos.map((el)=>{
            return  <div className={styles.div1} key={el.id}>
            <div>{el.title}</div>
            <button onClick={()=>handleDelete(el.id)}>DELETE</button>
            </div>
            })
        }
    </div>
  )
}
