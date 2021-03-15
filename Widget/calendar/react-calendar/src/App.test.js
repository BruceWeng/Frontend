import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

const date = new Date();
const day_map = ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'];
const month_map = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const current_year = date.getFullYear();
const current_month = date.getMonth();
const current_date = date.getDate();

const first_day = new Date(current_year, current_month, 1).getDay();
const day_count = new Date(current_year, current_month + 1, 0).getDate();

let app;
beforeEach(() => {
  app = render(<App />);
});
test('renders the component', () => {
  expect(app).toMatchSnapshot();
});
test('current month is correct', () => {
  expect(app.getByTestId('current-month')).toHaveTextContent(`${current_year} ${month_map[current_month]}`)
});
test('cell headers show correct days', () => {
  const days_element = app.getAllByTestId(/^cell-header/i);
  for (let i = 0; i< days_element.length; i++) {
    expect(days_element[i]).toHaveTextContent(`${day_map[i]}`);
  }
});
test('cells show correct dates', () => {
  const dates_element = app.getAllByTestId(/^cell-content/i);
  for (let day = first_day; day < first_day + day_count; day++) {
    expect(dates_element[day]).toHaveTextContent(`${day - first_day + 1}`);
  }
});
test('current date is highlighted', () => {
  expect(app.getByText(`${current_date}`)).toHaveClass('Cell--highlight');
  userEvent.click(app.getByTestId('next-btn'));
  expect(app.getByText(`${current_date}`)).toHaveClass('Cell');
});
test('previous button decrease 1 month', () => {
  userEvent.click(app.getByTestId('prev-btn'));
  const new_current_month = current_month === 0 ? 11 : current_month - 1;
  const new_current_year = current_month === 0 ? current_year - 1 : current_year;
  expect(app.getByTestId('current-month')).toHaveTextContent(`${new_current_year} ${month_map[new_current_month]}`);
  const new_first_day = new Date(new_current_year, new_current_month, 1).getDay();
  const new_day_count = new Date(new_current_year, new_current_month + 1, 0).getDate(); 
  const dates_element = app.getAllByTestId(/^cell-content/i);
  for (let day = new_first_day; day < new_first_day + new_day_count; day++) {
    expect(dates_element[day]).toHaveTextContent(`${day - new_first_day + 1}`);
  }
});
test('next button increase 1 month', () => {
  userEvent.click(app.getByTestId('next-btn'));
  const new_current_month = current_month === 11 ? 0 : current_month + 1;
  const new_current_year = current_month === 11 ? current_year + 1 : current_year;
  expect(app.getByTestId('current-month')).toHaveTextContent(`${new_current_year} ${month_map[new_current_month]}`);
  const new_first_day = new Date(new_current_year, new_current_month, 1).getDay();
  const new_day_count = new Date(new_current_year, new_current_month + 1, 0).getDate(); 
  const dates_element = app.getAllByTestId(/^cell-content/i);
  for (let day = new_first_day; day < new_first_day + new_day_count; day++) {
    expect(dates_element[day]).toHaveTextContent(`${day - new_first_day + 1}`);
  }
});
