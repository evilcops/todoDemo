import React, { useState, useEffect } from 'react'
import TodoForm from './TodoForm'
import Todo from './Todo'
import axios from 'axios'

function TodoList() {
  const [todos, setTodos] = useState([])
  const [todos2, setTodos2] = useState([])

  const link = 'http://localhost:5000/api/v1/crud'

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return
    }

    const newTodos = [todo, ...todos]

    setTodos(newTodos)
    console.log(...todos)
  }

  const updateTodo = (todoId, newValue) => {
    axios.put(`${link}/${todoId}`, { name: newValue.text }).then((res) => {
      console.log(res)
      if (!newValue.text || /^\s*$/.test(newValue.text)) {
        return
      }
      setTodos((prev) =>
        prev.map((item) => (item.id === todoId ? newValue : item))
      )
      window.location.reload(true)

      // const removedArr = [...todos].filter((todo) => todo.id !== todo._id)
      // setTodos(removedArr)
    })
  }

  const removeTodo = (todo) => {
    axios.delete(`${link}/${todo._id}`).then((res) => {
      console.log(res)
      window.location.reload(true)
      // const removedArr = [...todos].filter((todo) => todo.id !== todo._id)
      // setTodos(removedArr)
    })
  }

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete
      }
      return todo
    })
    setTodos(updatedTodos)
  }

  useEffect(() => {
    getTodos()
  }, [])

  const getTodos = async () => {
    // e.preventDefault()
    await axios.get(`${link}`).then((res) => {
      console.log(res)
      setTodos(res.data.crud)
      todos.push(res.data.crud)
    })
  }

  return (
    <>
      <h1>User Todo list</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </>
  )
}

export default TodoList
