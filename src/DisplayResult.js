import React from 'react'

import './DisplayResult.css'

const DisplayResult = ({ result, score, currentPhrase, initGame }) => {
  return (
    <div className="result d-flex flex-column align-items-center justify-content-around w-75 mb-0 border border-warning rounded alert alert-warning">

      <h3 className="text-center mt-3 mb-4">{result === 1 ? "Bravo, vous avez gagné!" : "Dommage, vous avez perdu!"}</h3>

      <p className="text-center">{result === 1 ? `Votre score est de ${score} points` : `Le mot à trouver était : ${currentPhrase.toUpperCase()}`}</p>

      <div className="d-flex flex-column align-items-center">

        <button
          className="replay btn btn-success"
          onClick={initGame}
        >
          Lancer une nouvelle partie
        </button>

        <p className="info font-weight-light font-italic mb-3"><small>Ou appuyez sur la touche entrée</small></p>

      </div>
    </div>
  )
}

export default DisplayResult