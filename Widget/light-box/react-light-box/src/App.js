import './App.css';
import {useEffect, useState, useRef} from 'react'
import ReactDOM from 'react-dom'

function setBackgroundImage(image) {
  return {
    backgroundImage: `url(${image.thumbnailUrl})`
  }
}

function useComponentVisible(initialIsVisible) {
  const [isComponentVisible, setComponentVisible] = useState(initialIsVisible)
  const ref = useRef(null)

  function handleClickOutside(event) {
    if(ref.current && !ref.current.contains(event.target)) {
      setComponentVisible(false)
    }
  }

  useEffect(() => {
    // set click event on capture phase because when 
    // click on image and portal initially created, 
    // event also triger handleClickOutside if it is bubble phase.
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [])

  return {ref, isComponentVisible, setComponentVisible}
}

function Modal({selectedId, images, onClose}) {
  return ReactDOM.createPortal(
    <div className='Modal__container'>
      <div className='Modal__content' 
           style={setBackgroundImage(images[selectedId])}
      >
        {`${images[selectedId].title}`}
        <span className='Modal__icon--close' onClick={() => onClose(true)}></span>
      </div>
    </div>
  , document.body)
}

function App() {
  const [images, setImages] = useState([])
  const [selectedId, setSelectedId] = useState(null)

  async function fetchImages() {
    const result = await fetch(`http://jsonplaceholder.typicode.com/photos?_start=0&_limit=10`)
    const images = await result.json()
    setImages(images)
  }

  useEffect(() => {
    fetchImages()
  }, [])

  const {ref, isComponentVisible, setComponentVisible} = useComponentVisible(false)

  function handleImageClick(i) {
    setSelectedId(i)
    setComponentVisible(true)
  }
  return (
    <div className="App">
      <div className='Image__container'>
        {
          images.map((image, i) => {
            return (
              <>
                <div key={i} 
                     className='Image' 
                     style={setBackgroundImage(image)}
                     onClick={() => handleImageClick(i)}
                >
                  {`${i}, ${image.title}`}
                </div>
              </>
            )
          })
        }
      </div>
      <div ref={ref}>{/* Remember to bind ref outside of the Modal */}
        {isComponentVisible
          ? <Modal 
              selectedId={selectedId} 
              images={images} 
              onClose={setComponentVisible}
            />
          : null}
      </div>
    </div>
  );
}

export default App;
