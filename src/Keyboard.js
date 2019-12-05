import React, { Component } from 'react'

import './Keyboard.css'

const ALPHABET = "abcdefghijklmnopqrstuvwxyz".split('')

class Keyboard extends Component {
  
  componentDidMount() {
    document.addEventListener("keypress", this.handleKeyPress)
  }

  componentWillUnmount() {
    document.removeEventListener("keypress", this.handleKeyPress)
  }

  // fonction fléchée pour récupérer le this
  handleKeyPress = (e) => {
    if (ALPHABET.includes(e.key.toLowerCase())) {
      this.props.onClick(e.key.toLowerCase())
    }
  }

  render() {
    return (
      <div className="keyboard keyboard-active d-flex flex-wrap justify-content-center mb-5">

        {ALPHABET.map((letter, index) => (

          <button
            className="keys btn btn-info m-2 p-3"
            key={"key_" + index}
            onClick={() => this.props.onClick(letter)}
            disabled={this.props.usedLetters.has(letter)}
          >
            {letter.toUpperCase()}
          </button>
        ))}
      </div>
    )
  }
}

export default Keyboard