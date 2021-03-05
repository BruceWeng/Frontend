import './App.css'
import React, {useReducer} from 'react'

function Calendar() {
  const date = new Date();
  const day_map = ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'];
  const month_map = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const current_year = date.getFullYear();
  const current_month = date.getMonth();
  const current_date = date.getDate();
  const ACTIONS = {
    MONTH_DECREASED: 'month-decreased',
    MONTH_INCREASED: 'month-increased'
  }
  const reducer = (time, action) => {
    switch (action.type) {
      case ACTIONS.MONTH_DECREASED:
        return {
          ...time,
          year: time.year + Math.floor(action.payload.month / 12),
          month: (action.payload.month + 12) % 12 
        }
      case ACTIONS.MONTH_INCREASED:
        return { 
          ...time,
          year: time.year + Math.floor(action.payload.month / 12),
          month: (action.payload.month + 12) % 12 
        }
      default:
        return time;
    }
  }
  let [time, dispatch] = useReducer(reducer, {year: date.getFullYear(), month: date.getMonth()});

  const first_day = new Date(time.year, time.month, 1).getDay();
  const day_count = new Date(time.year, time.month + 1, 0).getDate();

  let table = [[...Array(7).keys()]];
  for (let i = 0; i < 6; i++) table.push(Array(7).fill(undefined));
  for (let day = first_day; day < first_day + day_count; day++) {
    let row = Math.floor(day / 7) + 1;
    let col = day % 7;
    table[row][col] = day - first_day + 1;
  }

  const handlePrevButton = () => {
    dispatch({type: ACTIONS.MONTH_DECREASED, payload: {month: time.month - 1}});
  }

  const handleNextButton = () => {
    dispatch({type: ACTIONS.MONTH_INCREASED, payload: {month: time.month + 1}});
  }

  return (
    <>
      <header><h2>{`${time.year} ${month_map[time.month]}`}</h2></header>
      <nav>
        <button onClick={handlePrevButton}>{'<'}</button>
        <button onClick={handleNextButton}>{'>'}</button>
      </nav>
      <table>
        <thead>
        {table.filter((row, i) => i === 0).map((row, i) => {
            return (
              <tr key={i}>{row.map((col, j) => {
                  return <th key={j} className="Cell">{day_map[col]}</th>
              })}</tr>
            )
          })}
        </thead>
        <tbody>
          {table.filter((row, i) => i !== 0 
              && !(row[0] === undefined && row[row.length-1] === undefined)
            )
            .map((row, i) => {
              return (
                <tr key={i}>{row.map((col, j) => {
                  return <td key={j} 
                    className={col === current_date
                      && time.month === current_month
                      && time.year === current_year 
                      ? "Cell--highlight" 
                      : "Cell"}>{col}</td>
                })}</tr>
              )
            })} 
        </tbody>
      </table>
    </>
  );
} // End of Calendar

function App() {
  return (
    <div className="App">
      <Calendar />
    </div>
  );
}

export default App;
