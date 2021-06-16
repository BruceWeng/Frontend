import { render, fireEvent} from '@testing-library/react'
import App from './App'

test('name input changes', () => {
  const {getByTestId} = render(<App />)
  const name_input = getByTestId('name-input')
  fireEvent.change(name_input, {target: {value: 'test-name'}})
  expect(name_input.value).toBe('test-name')
})
test('email select changes', () => {
  const {getByTestId, getAllByTestId} = render(<App />)
  const email_select = getByTestId('email-select')
  fireEvent.change(email_select, {target: {value: 'Jayne_Kuhic@sydney.com'}})
  const email_select_options = getAllByTestId('email-select-option')
  expect(email_select_options[0].selected).toBeFalsy()
  expect(email_select_options[1].selected).toBeTruthy()
  expect(email_select_options[2].selected).toBeFalsy()
})
test('body textarea changes', () => {
  const {getByTestId} = render(<App />)
  const body_textarea = getByTestId('body-textarea')
  fireEvent.change(body_textarea, {target: { value: 'text-body'}})
  expect(body_textarea.value).toBe('text-body')
})
