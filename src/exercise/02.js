// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import React from 'react'

const getItemFromStorage = key => {
  const value = window.localStorage.getItem(key)
  try {
    return JSON.parse(value)
  } catch (err) {
    window.localStorage.removeItem(key)
  }
  return null
}

const setItemInStorage = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value))
}

const removeItemFromStorage = key => {
  window.localStorage.removeItem(key)
}

const useLocalStorageState = (key, initialValue) => {
  const [value, setValue] = React.useState(() => {
    const defaultValue =
      typeof initialValue === 'function' ? initialValue() : initialValue
    return getItemFromStorage(key) || defaultValue
  })

  const prevKeyRef = React.useRef(key)

  React.useEffect(() => {
    const prevKey = prevKeyRef.current
    if (prevKey !== key) {
      removeItemFromStorage(prevKey)
    }
    prevKeyRef.current = key
    setItemInStorage(key, value)
  }, [key, value])

  return [value, setValue]
}

function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStorageState('name', initialName)

  function handleChange(event) {
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
