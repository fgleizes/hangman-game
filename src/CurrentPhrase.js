import React from 'react'

import './CurrentPhrase.css'

const CurrentPhrase = ({currentPhrase, usedLetters}) => {
  return (
    <div className="phrase m-5">

      <h5 className="m-0">

        {computeDisplay(currentPhrase, usedLetters).split('').map((letter, index) => (

          <span 
            className="letter mb-3 mx-3 d-inline-block" 
            key={"letter_"+index}
          >
            {letter.toUpperCase()}
          </span>
        ))}
      </h5>
    </div>
  )
}

// Produit une représentation textuelle de l’état de la partie,
// chaque lettre non découverte étant représentée par un _underscore_.
function computeDisplay(phrase, usedLetters) {
  return phrase.replace(/\w/g,
    (letter) => (usedLetters.has(letter) ? letter : '_')
  )
}

export default CurrentPhrase