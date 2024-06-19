import { Timer } from './Timer.jsx'
import { Indicator } from './Indicator.jsx'

/**
 * Componente GameBox que encapsula a lógica e a interface do jogo.
 * @param {Object} props - As propriedades do componente.
 * @param {boolean} props.isPlaying - Indica se o jogo está em andamento.
 * @param {Array<string>} props.sequence - A sequência de letras do jogo.
 * @param {number} props.currentIndex - O índice atual na sequência.
 * @param {string} [props.message] - Mensagem a ser exibida quando o jogo não está em andamento.
 * @param {Function} props.startGame - Função para iniciar o jogo.
 * @param {number} props.timeLeft - O tempo restante em segundos.
 * @param {number} props.timeToPlay - O tempo total de jogo em segundos.
 * @param {Function} props.toggleVisibility - Função para alternar a visibilidade do componente.
 * @param {Function} props.setIsPlaying - Função para definir o estado de execução do jogo.
 * @returns {JSX.Element} Um elemento JSX que representa a caixa de jogo.
 * @example
 * <GameBox
 *   isPlaying={false}
 *   sequence={['A', 'B', 'C']}
 *   currentIndex={0}
 *   message="Clique em iniciar para começar"
 *   startGame={() => console.log('Jogo iniciado')}
 *   timeLeft={60}
 *   timeToPlay={60}
 *   toggleVisibility={() => console.log('Visibilidade alternada')}
 *   setIsPlaying={(isPlaying) => console.log('Jogo em execução:', isPlaying)}
 * />
 */
export const GameBox = ({
	isPlaying,
	sequence,
	currentIndex,
	message,
	startGame,
	timeLeft,
	timeToPlay,
	toggleVisibility,
	setIsPlaying,
}) => {
	return (
		<div className="game-backdrop">
			<div className="game-box">
				<button
					className="game_close"
					onClick={() => {
						toggleVisibility()
						setIsPlaying(false)
					}}
				>
					&times;
				</button>
				<i
					className={
						isPlaying ? 'slide-in-bottom' : 'rotate-scale-up'
					}
				></i>
				<div className="game">
					<Indicator
						sequence={sequence}
						currentIndex={currentIndex}
						isPlaying={isPlaying}
					/>
					{isPlaying ? (
						<Timer timeLeft={timeLeft} timeToPlay={timeToPlay} />
					) : (
						message && <h4>{message}</h4>
					)}
					<button
						className={isPlaying ? '' : 'pulsate-bck'}
						onClick={
							isPlaying
								? () => {
										setIsPlaying(false)
								  }
								: startGame
						}
					>
						{isPlaying ? 'Reiniciar jogo' : 'Iniciar Jogo'}
					</button>
				</div>
			</div>
		</div>
	)
}