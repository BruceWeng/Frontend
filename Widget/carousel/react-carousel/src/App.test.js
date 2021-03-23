import { render, act } from '@testing-library/react';
import user from '@testing-library/user-event'
import App from './App';

global.fetch = () => Promise.resolve({
  json: () => Promise.resolve([
    {
      "albumId": 1,
      "id": 1,
      "title": "accusamus beatae ad facilis cum similique qui sunt",
      "url": "https://via.placeholder.com/600/92c952",
      "thumbnailUrl": "https://via.placeholder.com/150/92c952"
    },
    {
      "albumId": 1,
      "id": 2,
      "title": "reprehenderit est deserunt velit ipsam",
      "url": "https://via.placeholder.com/600/771796",
      "thumbnailUrl": "https://via.placeholder.com/150/771796"
    },
    {
      "albumId": 1,
      "id": 3,
      "title": "officia porro iure quia iusto qui ipsa ut modi",
      "url": "https://via.placeholder.com/600/24f355",
      "thumbnailUrl": "https://via.placeholder.com/150/24f355"
    }
  ])
})
let app
beforeEach(async () => {
  app = await act(async () => render(<App />))
})
test('renders carousel correctly', () => {
  expect(app).toMatchSnapshot()
});
test('previous button decrease image index', () => {

})
test('next button increase image index', () => {

})
test('slide image matches correct image url', () => {

})
test('test dot current index is highlighted', () => {

})