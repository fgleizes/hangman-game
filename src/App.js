import React, { Component } from 'react'

import './App.css'

import Keyboard from './Keyboard'
import CurrentPhrase from './CurrentPhrase'
import DisplayResult from './DisplayResult'
import Lifes from './Lifes'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Jeu du pendu",
      phrasesCollection: [
        "dependance", "composant", "librairie", "exercice", "pratique", "amusant", "reactif", "anticonstitutionnellement",
        "developpement", "informatique", "ordinateur", "encapsulation", "interpolation", "programmation", "technologie",
      ],
      currentPhrase: null,
      usedLetters: new Set(),
      result: 0, // 0: neutre | 1: gagné | 2: perdu
      attempt: 0,
      maxAttempt: 7,
      score: 0,
    }
  }

  componentDidMount() {
    this.initGame()

    document.addEventListener("keypress", this.handleEnterKeyPress)
  }

  componentWillUnmount() {
    document.removeEventListener("keypress", this.handleEnterKeyPress)
  }

  initGame = () => {
    const phrasesCollection = [...this.state.phrasesCollection]
    const currentPhrase = phrasesCollection.splice(Math.floor(Math.random() * phrasesCollection.length), 1)
    const score = this.state.result === 1 ? this.state.score : 0

    this.setState({
      phrasesCollection,
      currentPhrase: currentPhrase[0], 
      usedLetters: new Set(), 
      result: 0, 
      attempt: 0,
      score
    })
  }

  handleEnterKeyPress = (e) => {
    if (this.state.result !== 0 && e.keyCode === 13) {
      this.initGame()
    }
  }

  handleLetterClicked = (letter) => {
    if (this.state.result === 0) { // On agit seulement si la partie n'est ni gagnée, ni perdue. Sinon il faut réinitiliser la partie

      if (!this.state.usedLetters.has(letter)) { // Si la lettre cliquée ou saisie n'est pas stockée dans les lettres utilisées
        
        const usedLetters = new Set([...this.state.usedLetters]).add(letter)

        let {attempt, result, score} = this.state

        // Si la lettre cliquée n'est pas présente dans la phrase à découvrir
        if (!this.state.currentPhrase.includes(letter)) {
          
          if (attempt < this.state.maxAttempt) { // Alors on incrémente le nombre de tentative
            attempt++
          }
          
          if (attempt === this.state.maxAttempt) { // Et si le nombre de tentative atteint 0, la partie est perdue
            result = 2 // => perdu !
          }
        }

        // Si toutes les lettres de la phrase à découvrir sont présentes dans les lettres utilisées, alors c'est gagné!
        if ([...this.state.currentPhrase].filter(x => usedLetters.has(x)).join('') === this.state.currentPhrase){
          result = 1 // => gagné !
          score += this.state.maxAttempt - attempt
        }
        
        this.setState({ usedLetters, attempt, result, score })

      } else { // Si la lettre saisie est déjà stockée dans les lettres utilisées
        
        alert(`La lettre "${letter.toUpperCase()}" a déjà été utilisé!`) 
      }
    }
  }

  render() {
    return (
      <div className="pendu p-2 p-md-5 d-flex flex-column align-items-center justify-content-between">
        <h1>{this.state.title}</h1>

        <div className="container-score">
          <p className="score">Votre score actuel : {this.state.score} points</p>
          <Lifes
            attempt={this.state.attempt}
            maxAttempt={this.state.maxAttempt}
          />
        </div>
        
        {this.state.currentPhrase !== null && 
          <CurrentPhrase
            currentPhrase={this.state.currentPhrase}
            usedLetters={this.state.usedLetters}
          />
        }
        
        {this.state.result === 0 &&
          <Keyboard 
            onClick={this.handleLetterClicked}
            usedLetters={this.state.usedLetters}
          />
        }

        {this.state.result !== 0 &&
          <DisplayResult
            result={this.state.result}
            score={this.state.maxAttempt - this.state.attempt}
            currentPhrase={this.state.currentPhrase}
            initGame={this.initGame}
          />
        }
      </div>
    )
  }
}

export default App;