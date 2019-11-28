import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

import './Lifes.css'

const Lifes = ({ attempt, maxAttempt }) => {
  return (
    <div className="lifes">
      { 
        handleLifes(attempt, maxAttempt).map((value, index) => {
          return value === 1 && <span className="life mr-4" key={"life_" + index}><FontAwesomeIcon icon={faHeart} color="red" /></span>
        }) 
      }
    </div>
  )
}

function handleLifes(attempt, maxAttempt) {
  let lifes = []
  
  for (let i = 1; i <= maxAttempt; i++) {
    if (i <= attempt) {
      lifes.unshift(0)
    } else {
      lifes.unshift(1)
    }
  }

  return lifes
}

export default Lifes