import './App.css';
import {TodoContext, TodoProvider, ACTIONS} from './TodoContext.js'
import {useContext, useEffect, useState} from 'react'
function TodoContainer() {
  const [todo, dispatch] = useContext(TodoContext)
  const [searchInput, setSearchInput] = useState('')
  useEffect(() => {
    dispatch({type: ACTIONS.TODOS_ISLOADING, payload: {isLoading: true}})
    fetch('http://localhost:5000/todos')
    .then(response => {
      dispatch({type: ACTIONS.TODOS_ISLOADING, payload: {isLoading: false}})
      console.log('success loading')
      return response.json()
    })
    .then(json => dispatch({type: ACTIONS.TODOS_INITIALIZED, payload: {items: json}}))
    .catch(reason => {
      dispatch({type: ACTIONS.TODOS_ISLOADING, payload: {isLoading: false}})
      console.error(`Todos loading failed: ${reason}`)
    })
  }, [dispatch])

  const handleTodoCheck = (item) => {
    dispatch({
      type: ACTIONS.TODO_UPDATED,
      payload: {
        item: {
          ...item,
          isComplete: !item.isComplete
        }
      }
    })
  }

  const handleTodoChange = (e, item) => {
    dispatch({
      type: ACTIONS.TODO_UPDATED,
      payload: {
        item: {
          ...item,
          editingVal: e.target.value
        }
      }
    })
  }

  const handleTodoEditingStatus = (item) => {
    if (item.isComplete) return
    dispatch({
      type: ACTIONS.TODO_UPDATED,
      payload: {
        item: {
          ...item,
          editingVal: item.val,
          isEditing: !item.isEditing
        }
      }
    }) 
  }

  const handleInputBtnSubmit = (e) => {
    console.log('in handleInputBtnSubmit')
    e.preventDefault()
    dispatch({
      type: ACTIONS.TODO_ADDED, 
      payload: {
        item: {
          id: Date.now(),
          val: searchInput, 
          isComplete: false,
          editingVal: searchInput,
          isEditing: false
        }
      }
    })
    setSearchInput(() => '')
  }

  const handleTodoSaveClick = (item) => {
    dispatch({
      type: ACTIONS.TODO_UPDATED,
      payload: {
        item: {
          ...item,
          val: item.editingVal,
          isEditing: false
        }
      }
    })
  }

  const handleTodoDeleteClick = (item) => {
    dispatch({
      type: ACTIONS.TODO_DELETED,
      payload: {
        item: {
          id: item.id
        }
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
        <ul>{todo.items.map((item) => 
          <li className="Todo__item" key={item.id}>
            <div>
              <input type="checkbox" onClick={() => handleTodoCheck(item)}></input>
              {item.isEditing 
                ? <input value={item.editingVal} 
                        autoFocus="autofocus"
                        onChange={(e) => handleTodoChange(e, item)}
                        onKeyUp={(e) => e.key === 'Enter' ? handleTodoSaveClick(item) : null}></input>
                : <span className={`${item.isComplete ? 'Todo__content--cross' : 'Todo__content'}`} 
                        onClick={() => handleTodoEditingStatus(item)}>
                    {item.val}
                  </span>}
            </div>
            <button className="Todo__item--delete" onClick={() => handleTodoDeleteClick(item)}>Delete</button>
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
