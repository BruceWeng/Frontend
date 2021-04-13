import React, {useReducer} from 'react';
export const ACTIONS = {
  TODOS_INITIALIZED: 'TODOS-INITIALIZED',
  TODOS_ISLOADING: 'TODOS-ISLOADING',
  TODO_ADDED: 'TODO-ADDED',
  TODO_UPDATED: 'TODO-UPDATED',
  TODO_DELETED: 'TODO-DELETED',
}
export const TodoContext = React.createContext();
export function TodoProvider({ children }) {
  function reducer(todo, action) {
    switch (action.type) {
      case ACTIONS.TODO_ADDED: {
        console.log('ACTIONS.TODO_ADDED')
        fetch('http://localhost:5000/todos', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(action.payload.item)
        })
        .then(response => {
          if (response.ok) console.log('post todo successed')
          else throw new Error(`${response.status} (${response.statusText})`)
        })
        .catch(reason => console.error(`post todo failed: ${reason}`))

        const new_items = [...todo.items, action.payload.item]
        return {
          ...todo,
          items: new_items
        }
      }
      case ACTIONS.TODO_UPDATED: {
        console.log('ACTIONS.TODO_UPDATED')
        const new_items = [...todo.items]
        fetch(`http://localhost:5000/todos/${action.payload.item.id}`, {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(action.payload.item)
        })
        .then(response => {
          if (response.ok) console.log('put todo successed')
          else throw new Error(`${response.status} (${response.statusText})`)
        })
        .catch(reason => console.error(`put todo failed: ${reason}`))
        return {
          ...todo,
          items: new_items.map((item) => {
            if (item.id === action.payload.item.id) {
              item = action.payload.item
            }
            return item
          })
        }
      }
      case ACTIONS.TODO_DELETED: {
        console.log('ACTIONS.TODO_DELETED')
        fetch(`http://localhost:5000/todos/${action.payload.item.id}`, {
          method: 'DELETE',
          headers: {'Content-Type': 'application/json'}
        })
        .then(response => {
          if (response.ok) console.log('delete todo successed')
          else throw new Error(`${response.status} (${response.statusText})`)
        })
        .catch(reason => console.error(`delete todo failed: ${reason}`))
        return {
          ...todo,
          items: todo.items.filter((item) => item.id !== action.payload.item.id)
        }
      }
      case ACTIONS.TODOS_INITIALIZED: {
        console.log('ACTIONS.TODOS_INITIALIZED')
        return {
          ...todo,
          items: action.payload.items
        }
      }
      case ACTIONS.TODOS_ISLOADING: {
        console.log('ACTIONS.TODOS_ISLOADING')
        console.log(action.payload.isLoading)
        return {
          ...todo,
          isLoading: action.payload.isLoading
        }
      }
      default: return todo
    }
  }

  let [todo, dispatch] = useReducer(reducer, {isLoading: false, items: []});
  return (
    <TodoContext.Provider value={[todo, dispatch]}>
      {children}
    </TodoContext.Provider>
  );
}