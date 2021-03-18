import './App.css';
import {useEffect, useReducer} from 'react';

function App() {
  const ACTIONS = {
    IMAGES_INITIALIZED: 'images-initialized',
    SLIDE_INDEX_INCREASED: 'slide-index-increased',
    SLIDE_INDEX_DECREASED: 'slide-index-decreased',
    SLIDE_INDEX_SELECTED: 'slide-index-selected'
  }
  const reducer = (slide, action) => {
    switch (action.type) {
      case ACTIONS.IMAGES_INITIALIZED: {
        return {
          ...slide,
          images: action.payload.images
        }
      }
      case ACTIONS.SLIDE_INDEX_INCREASED: {
        return {
          ...slide,
          selected_idx: Math.floor((action.payload.selected_idx + 1) % slide.images.length) 
        }
      }
      case ACTIONS.SLIDE_INDEX_DECREASED: {
        return {
          ...slide,
          selected_idx: Math.floor((action.payload.selected_idx - 1 + slide.images.length) % slide.images.length)
        }
      }
      case ACTIONS.SLIDE_INDEX_SELECTED: {
        return {
          ...slide,
          selected_idx: action.payload.selected_idx
        }
      }
      default: {
        return slide;
      }
    }
  }
  const [slide, dispatch] = useReducer(reducer, {images: [], selected_idx: 0})
  const handleBtnPrevClick = () => {
    dispatch({type: ACTIONS.SLIDE_INDEX_DECREASED, payload: {selected_idx: slide.selected_idx}})
  }
  const handleBtnNextClick = () => {
    dispatch({type: ACTIONS.SLIDE_INDEX_INCREASED, payload: {selected_idx: slide.selected_idx}})
  }
  const handleDotClick = (idx) => {
    dispatch({type: ACTIONS.SLIDE_INDEX_SELECTED, payload: {selected_idx: idx}})
  }
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/photos?_start=0&_limit=10')
    .then(response => response.json())
    .then(json => dispatch({type: ACTIONS.IMAGES_INITIALIZED, payload: {images: json}}))
    .catch(reason => console.error(`Image fetching failed: ${reason}`))
  }, [])
  return (
    <div className="App">
      <div className="Carousel__slide-list-container">
        <button className="Carousel__btn--prev" data-testid="btn-prev" onClick={handleBtnPrevClick}></button>
        <ul className="Carousel__slide-list">
          {slide.images.filter((image, idx) => idx === slide.selected_idx)
            .map((image) => <li key={image.id} 
                                className="Carousel__slide-item" 
                                data-testid="slide-item"
                                style={{backgroundImage: `url("${image.url}")`}}>
                              <div>{image.id}. {image.title}</div>
                            </li>)
          }
        </ul>
        <button className="Carousel__btn--next" data-testid="btn-next"onClick={handleBtnNextClick}></button>
      </div>
      <ul className="Carousel__dots">
        {slide.images.map((image, idx) => <li key={idx}
                                              className={idx === slide.selected_idx 
                                                ? "Carousel__dot--highlight"
                                                : "Carousel__dot"} 
                                              data-testid={`dot_${idx}`}
                                              onClick={() => handleDotClick(idx)}>
                                          </li>)
        }
      </ul>
    </div>
  );
}

export default App
