import './App.css';
import {TodoContext, TodoProvider, ACTIONS} from './TodoContext.js'
import {useContext, useEffect, useState} from 'react'

function TodoContainer() {
  const [todos, dispatch] = useContext(TodoContext)
  const [searchInput, setSearchInput] = useState('')

  useEffect(() => {
    console.log(searchInput)
    console.log(todos)
  }, [searchInput, todos])

  const handleTodoCheck = (todo) => {
    dispatch({
      type: ACTIONS.TODO_UPDATED,
      payload: {
        ...todo,
        isComplete: !todo.isComplete
      }
    })
  }

  const handleTodoChange = (e, todo) => {
    dispatch({
      type: ACTIONS.TODO_UPDATED,
      payload: {
        ...todo,
        editingVal: e.target.value
      }
    })
  }

  const handleTodoEditingStatus = (todo) => {
    if (todo.isComplete) return
    dispatch({
      type: ACTIONS.TODO_UPDATED,
      payload: {
        ...todo,
        editingVal: todo.val,
        isEditing: !todo.isEditing
      }
    }) 
  }

  const handleInputBtnSubmit = (e) => {
    e.preventDefault()
    dispatch({
      type: ACTIONS.TODO_ADDED, 
      payload: {
        id: Date.now(), 
        val: searchInput, 
        isComplete: false,
        editingVal: searchInput,
        isEditing: false
      }
    })
    setSearchInput(() => '')
  }

  const handleTodoSaveClick = (todo) => {
    dispatch({
      type: ACTIONS.TODO_UPDATED,
      payload: {
        ...todo,
        val: todo.editingVal,
        isEditing: false
      }
    })
  }

  const handleTodoDeleteClick = (todo) => {
    dispatch({
      type: ACTIONS.TODO_DELETED,
      payload: {
        id: todo.id
      }
    })
  }

  return (
    <div className="Todo__container">
      <div className="Todo__post-input">
        <form id="todo-form">
          <input type='text' value={searchInput} onChange={(e) => setSearchInput(e.target.value)}></input>
          <button type="submit" onClick={(e) => handleInputBtnSubmit(e)}>Submit</button> 
        </form>
      </div>
      <div className="Todo__items">
        <ul>{todos.map((todo) => 
          <li className="Todo__item" key={todo.id}>
            <div>
              <input type="checkbox" onClick={() => handleTodoCheck(todo)}></input>
              {todo.isEditing 
                ? <input value={todo.editingVal} 
                         autoFocus="autofocus"
                         onChange={(e) => handleTodoChange(e, todo)}
                         onKeyUp={(e) => e.key === 'Enter' ? handleTodoSaveClick(todo) : null}></input>
                : <span className={`${todo.isComplete ? 'Todo__content--cross' : 'Todo__content'}`} 
                        onClick={() => handleTodoEditingStatus(todo)}>
                    {todo.val}
                  </span>}
                <button className="Todo__item--delete" onClick={() => handleTodoDeleteClick(todo)}>Delete</button>
            </div>
          </li>)}
        </ul>
      </div>
    </div>
  )
}

function App() {
  return (
    <TodoProvider>
      <TodoContainer />
    </TodoProvider>
  );
}

export default App;
