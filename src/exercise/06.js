// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import React, {useEffect, useState} from 'react'
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {
  fetchPokemon,
  PokemonForm,
  PokemonInfoFallback,
  PokemonDataView,
} from '../pokemon'

const initialState = {
  status: 'idle',
  pokemon: null,
  error: null,
}

function PokemonInfo({pokemonName}) {
  const [{status, pokemon, error}, setState] = useState(initialState)

  useEffect(() => {
    async function fetchPokemonByTerm(searchTerm) {
      try {
        setState(state => ({...state, status: 'pending'}))
        const pokemonData = await fetchPokemon(searchTerm)
        setState(state => ({
          ...state,
          pokemon: pokemonData,
          status: 'resolved',
        }))
      } catch (error) {
        console.warn(' errror', error)
        setState(state => ({...state, error, status: 'rejected'}))
      }
    }

    if (pokemonName) {
      fetchPokemonByTerm(pokemonName)
    }
  }, [pokemonName])

  if (status === 'idle') {
    return 'Submit a pokemon'
  }

  if (status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />
  }

  if (status === 'rejected') {
    return (
      <div role="alert">
        There was an error:{' '}
        <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      </div>
    )
  }

  return <PokemonDataView pokemon={pokemon} />
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
