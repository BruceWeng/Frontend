import {useState} from 'react'
import './App.css';

function App() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('Eliseo@gardner.biz')
  const [body, setBody] = useState('')

  function handleNameChange(e) {
    const {value} = e.target
    setName(value)
  }
  function handleEmailChange(e) {
    const {value} = e.target
    setEmail(value)
  }
  function handleBodyChange(e) {
    const {value} = e.target
    setBody(value)
  }
  async function handleSubmitClick(e) {
    e.preventDefault()
    alert(JSON.stringify({name, email, body}))
    const result = await postData({name, email, body})
    alert(JSON.stringify(result))
  }
  async function postData(data) {
    const response = await fetch('https://jsonplaceholder.typicode.com/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    return await response.json()
  }
  return (
    <div className="App">
      <form onSubmit={handleSubmitClick}>
        <label>
          Name:
          <input data-testid='name-input' type='text' name='name' value={name} onChange={handleNameChange}/>
        </label>
        <label>
          Email:
          <select data-testid='email-select' name='email' value={email} onChange={handleEmailChange}>
            <option data-testid='email-select-option' value='Eliseo@gardner.biz'>Eliseo@gardner.biz</option>
            <option data-testid='email-select-option' value='Jayne_Kuhic@sydney.com'>Jayne_Kuhic@sydney.com</option>
            <option data-testid='email-select-option' value='Nikita@garfield.biz'>Nikita@garfield.biz</option>
          </select>
        </label>
        <label>
          Body:
          <textarea data-testid='body-textarea' name='body' value={body} onChange={handleBodyChange}/>
        </label>
        <input data-testid='submit-input' type='submit' value='Submit'></input>
      </form>
    </div>
  );
}

export default App;
