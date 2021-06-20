import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([])
  const [userInput, setUserInput] = useState('')
  const [fuzzyUsers, setFuzzyUsers] = useState([])
  async function fetchUsers() {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users')
      const users = await response.json()
      setUsers(users)
      setFuzzyUsers(users)
    } catch(e) {
      console.error(e)
    }
  }
  useEffect(() => {
    fetchUsers()
  }, [])
  useEffect(() => {
    fuzzyMatchPattern(userInput)
  }, [userInput])
  function handleUserInputChange(e) {
    setUserInput(e.target.value)
  }
  function fuzzyMatchPattern(pattern) {
    let newFuzzyUsers = []
    pattern = pattern.toLowerCase()
    for(let user of users) {
      let start = 0
      let isValid = true
      let target = user.name.toLowerCase()
      for(let char of pattern) {
        target = target.slice(start)
        let next_start = target.indexOf(char)+1
        if(next_start>0 && next_start<target.length+1) start = next_start
        else {
          isValid = false 
          continue
        }
      }
      if(!isValid) continue
      newFuzzyUsers.push(user)
    }
    setFuzzyUsers(newFuzzyUsers)
  }
  return (
    <div className="App">
      <input type='text' name={userInput} onChange={handleUserInputChange}/>
      <ol>
        {
          fuzzyUsers.map((fuzzyUser, i) => (<li key={i}>{fuzzyUser.name}</li>))
        }
      </ol>
    </div>
  );
}

export default App;
