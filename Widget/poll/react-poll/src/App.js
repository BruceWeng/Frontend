import './App.css';
import {useEffect, useState} from 'react'

// Logic
function usePolls() {
  const [polls, setPolls] = useState([])
  async function fetchUsers() {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users')
      const users = await response.json()
      setPolls(new Array(users.length).fill(0))
    } catch(error) {
      console.error(`fetchUsers failed! ${error}`)
    }
  }
  useEffect(() => {
    fetchUsers()
  }, [])
  return [polls, setPolls]
}

// UI
function App() {
  const [polls, setPolls] = usePolls()
  const dynamicWidth = (i) => ({
    width: `${11 + polls[i]}rem`,
  })
  function handleSelect(i) {
    const newPolls = [...polls]
    newPolls[i]++
    setPolls(newPolls)
  }
  function handleAddNewUser() {
    const newPolls = [...polls]
    newPolls.push(0)
    setPolls(newPolls)
  }

  function calculatePercentage(i) {
    const sum = polls.reduce((acc, curr) => acc + curr, 0)
    if (sum===0) return `0 %`
    return `${Number.parseFloat(100*polls[i]/sum).toFixed(2)} %`
  }
  return (
    <div className="App">
      {
        polls.map((poll, i) => {
          return (
            <div key={i}>
              <button onClick={() => handleSelect(i)}>user {i}</button>
              <span>{polls[i]}</span>
              <div className='Bar' style={dynamicWidth(i)}>{calculatePercentage(i)}</div>
              <br/>
            </div>
          )
        })
      }
      <button onClick={handleAddNewUser}>Add new user</button>
    </div>
  );
}

export default App;
