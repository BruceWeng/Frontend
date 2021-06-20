import './App.css';
import {useEffect, useState} from 'react'
function App() {
  const [users, setUsers] = useState([])
  const [userInput, setUserInput] = useState('')
  async function fetchUsers() {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users')
      const users = await response.json()
      setUsers(users)
    } catch(e) {
      console.error(e)
    }
  }
  useEffect(() => {
    fetchUsers()
  }, [])
  function handleUserInputChange(e) {
    setUserInput(e.target.value)
  }

  return (
    <div className="App">
      <datalist id='users'>
        {users.map((user, i) => (
          <option key={i} name='user'>{user.name}</option>
        ))}
      </datalist>
      <form>
        <input className='UserInput' type='text' list='users' name='user' value={userInput} onChange={handleUserInputChange} autoComplete='off' />
      </form>
    </div>
  );
}

export default App;
