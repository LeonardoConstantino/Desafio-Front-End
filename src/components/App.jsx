import React, { useState, useEffect, useCallback } from 'react'
import {
  LIST_TOP_TEN_KEY,
  listTopTenStorage,
  timeToPlay,
} from '../utils/constantes.js'
import { GameBox } from './GameBox.jsx'
import { TableTopTen } from './TableTopTen.jsx'
import {
  generateSequence,
  getListTopTenSorted,
  playSound,
  getDateCreation,
  openKeyboard,
} from '../utils/helpers.js'
import mover from '../assets/sons/mover.mp3'
import perdeu from '../assets/sons/perdeu.mp3'
import tecla from '../assets/sons/tecla.mp3'

/**
 * Componente principal do aplicativo que gerencia o estado e a lógica do jogo.
 * @returns {JSX.Element} O elemento JSX que representa o aplicativo.
 * @example
 * <App />
 */
const App = () => {
  // Estado para a lista dos 10 melhores tempos.
  const [list, setList] = useState(
    listTopTenStorage ? JSON.parse(listTopTenStorage) : []
  )
  // Estado para a sequência de letras do jogo.
  const [sequence, setSequence] = useState([])
  // Estado para o índice atual na sequência.
  const [currentIndex, setCurrentIndex] = useState(0)
  // Estado para indicar se o jogo está em andamento.
  const [isPlaying, setIsPlaying] = useState(false)
  // Estado para o tempo restante em segundos.
  const [timeLeft, setTimeLeft] = useState(timeToPlay)
  // Estado para a mensagem exibida em alguns momentos  do jogo.
  const [message, setMessage] = useState('')
  // Estado para a visibilidade de alguns componentes.
  const [isVisible, setIsVisible] = useState(false)
  // Estado para o horário de início do jogo.
  const [startTime, setStartTime] = useState(null)
  // Estado para o horário de término do jogo.
  const [endTime, setEndTime] = useState(null)
  // Estado para o tempo decorrido durante o jogo.
  const [elapsedTime, setElapsedTime] = useState(null)

  /**
   * Função para finalizar o jogo, calcular o tempo decorrido e atualizar a lista dos 10 melhores tempos.
   */
  const endGame = () => {
    const end = new Date()
    setEndTime(end)

    if (startTime) {
      const timeElapsed = (end - startTime) / 1000
      setElapsedTime(timeElapsed)
      setMessage(
        `Parabéns! Você completou a sequência em ${timeElapsed.toFixed(
          2
        )} segundos.`
      )

      const newScore = {
        date: getDateCreation(),
        time: timeElapsed.toFixed(2),
      }
      const updatedList = [...list, newScore]
      setList(getListTopTenSorted(updatedList))
    }
    setIsPlaying(false)
  }

  /**
   * Função para iniciar o jogo, gerar uma nova sequência e resetar os estados relacionados ao jogo.
   */
  const startGame = () => {
    const newSequence = generateSequence(5)
    setSequence(newSequence)
    setCurrentIndex(0)
    setIsPlaying(true)
    setTimeLeft(timeToPlay)
    setMessage('Jogo interrompido')
    const start = new Date()
    setStartTime(start)
    setElapsedTime(null)
    openKeyboard(timeToPlay)
  }

  /**
   * Função para alternar a visibilidade de alguns componentes.
   */
  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  /**
   * Callback para lidar com o evento de teclado durante o jogo.
   * @param {KeyboardEvent} event - O evento de teclado.
   */
  const handleKeyPress = useCallback(
    (event) => {
      if (!isPlaying) return

      const { key } = event

      if (key.toUpperCase() === sequence[currentIndex]) {
        if (currentIndex === sequence.length - 1) {
          endGame()
        } else {
          playSound(mover)
          setCurrentIndex((prevIndex) => prevIndex + 1)
        }
      } else {
        setMessage('Tecla errada! Você perdeu.')
        playSound(perdeu, 0.2)
        setIsPlaying(false)
      }
    },
    [isPlaying, sequence, currentIndex, endGame, playSound, setMessage]
  )

  useEffect(() => {
    let timer

    const tick = () => {
      setTimeLeft((prevTime) => {
        playSound(tecla, 0.6)
        if (prevTime <= 1) {
          playSound(perdeu, 0.2)
          clearInterval(timer)
          setIsPlaying(false)
          setMessage('Tempo esgotado! Você perdeu.')
          return 0
        }
        return prevTime - 1
      })
    }

    if (isPlaying && timeLeft > 0) {
      timer = setInterval(tick, 1000)
    }

    return () => {
      clearInterval(timer)
    }
  }, [isPlaying, timeLeft])

  // Adicionar e remover listener de keydown
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleKeyPress])

  useEffect(() => {
    if (list && list.length > 0) {
      localStorage.setItem(LIST_TOP_TEN_KEY, JSON.stringify(list))
    }
  }, [list])

  return (
    <div className="App">
      <h1>Minigame de Sequência de Teclas</h1>
      <button
        className={isVisible ? '' : 'pulsate-bck'}
        onClick={toggleVisibility}
      >
        Comece a jogar
      </button>
      {isVisible && (
        <GameBox
          isPlaying={isPlaying}
          sequence={sequence}
          currentIndex={currentIndex}
          message={message}
          startGame={startGame}
          timeLeft={timeLeft}
          timeToPlay={timeToPlay}
          toggleVisibility={toggleVisibility}
          setIsPlaying={setIsPlaying}
        />
      )}

      {list.length > 0 && <TableTopTen list={list} />}
    </div>
  )
}

export default App
