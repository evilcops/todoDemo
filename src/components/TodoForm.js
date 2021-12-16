import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'

function TodoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : '')

  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.focus()
  })

  const link = 'http://localhost:5000/api/v1/crud'
  const [todos, setTodos] = useState([])

  useEffect(() => {
    // getTodos()
  }, [])

  async function getTodos() {}

  const handleChange = (e) => {
    setInput(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post(`${link}`, { name: input }).then((res) => {
      console.log(res)
      props.onSubmit({
        id: Math.floor(Math.random() * 10000),
        text: input,
      })
      setInput('')
      window.location.reload(true)
    })
  }

  const handleEditSubmit = (todoId, newValue) => {
    const editId = props.edit.id
    const editvalue = input

    axios.patch(`${link}/${editId}`, { name: editvalue }).then((res) => {
      console.log(res)
      if (!newValue.text || /^\s*$/.test(newValue.text)) {
        return
      }
      setTodos((prev) =>
        prev.map((item) => (item.id === todoId ? newValue : item))
      )
      window.location.reload(true)
    })
  }
  return (
    // <form onSubmit={handleSubmit} className='todo-form'>
    <form className='todo-form'>
      {props.edit ? (
        <>
          <input
            placeholder='Update your item'
            value={input}
            onChange={handleChange}
            name='text'
            ref={inputRef}
            className='todo-input edit'
          />
          <button onClick={handleEditSubmit} className='todo-button edit'>
            Update
          </button>
        </>
      ) : (
        <>
          <input
            placeholder='Add a todo'
            value={input}
            onChange={handleChange}
            name='text'
            className='todo-input'
            ref={inputRef}
          />
          <button onClick={handleSubmit} className='todo-button'>
            Add todo
          </button>
        </>
      )}
    </form>
  )
}

export default TodoForm
