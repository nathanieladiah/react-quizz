import './App.css'
import React from "react"
import Cover from './components/Cover'
import Quiz from './components/Quiz'

function App() {
  const [gameState, setGameState] = React.useState('Intro')

  function changeGameState() {
    setGameState(oldState => {
      if (oldState === 'Intro'){
        return 'Play';
      } else if (oldState === 'Play') {
        return 'Results';
      } else if (oldState === 'Results') {
        return 'Intro'
      }
    })
  }

  return (
    <main>
      {gameState === 'Intro' ? 
          <Cover 
            changeGameState={changeGameState}
          /> 
        : 
          <Quiz 
            changeGameState={changeGameState}
            gameState={gameState}
          />}
    </main>
  );
}

export default App;
