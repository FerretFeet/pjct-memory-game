/* eslint-disable react/prop-types */
import { useState } from 'react'
import './App.css'
import { Pokedex } from "pokeapi-js-wrapper"
const P = new Pokedex()



function Card({ title, onCardClick }) {
  const [img, setImg] = useState(null) //need state or just in-line use

    P.getPokemonByName(title) //title
      .then(function(response) {
        setImg(response.sprites.front_default) //set img
      })

    return (
      <button className="card" onClick={onCardClick}>
        <div className="img-container">
          <img src={img} className="pokemon" />
        </div>
        <h4 className="pokemon-title">{title}</h4>
      </button>
    )
  
}

export default function App() {
  const possibleTitles =
    [
      'pikachu',
      'eevee',
      'snorlax',
      'charizard',
      'lucario',
      'ditto',
      'gardevoir',
      'mewtwo',
      'squirtle',
      'bulbasaur',
      'vaporeon',
      'lopunny',
      'psyduck',
      'togepi',
      'jigglypuff',
      'jynx',
      'magikarp',
      'turtwig'
    ]

  const [activeTitles, setActiveTitles] = useState(chooseActiveTitles())

  const [prevChoices, setPrevChoices] = useState([])

  const [score, setScore] = useState(0)

  function chooseActiveTitles() {
    let tempArr = []
    Math.floor(Math.random() * (possibleTitles.length))
    while (tempArr.length < 12) {
      let tempTitle = possibleTitles[
        Math.floor(Math.random() * (possibleTitles.length))
      ]
      if (tempArr.indexOf(tempTitle) === -1) {
        tempArr.push(tempTitle)
      }
    }
    return tempArr
  }

  function handleClick(title) {
    console.log('handleClick title ' + title)
    //compare to prevchoices
    if (prevChoices.indexOf(title) === -1) {
    console.log('score ' + score)

      setScore(score + 1)
    console.log('score ' + score)



      setPrevChoices(() => {
        let temp = [...prevChoices, title]
        console.log(title + '<title temp>' + temp) //SEEMS TO DOUBLE'
        return temp
      })
    console.log('prev choices ' + prevChoices)

    } else { 
      setPrevChoices([])
      setScore(0)
    }
    setActiveTitles(chooseActiveTitles())
    //repopulate
  }

  return (
    <>

    {activeTitles.map((title) => {
      return <Card key={title} title={title}
       onCardClick={() => handleClick(title)}/>
    })}
    </>
  )

}