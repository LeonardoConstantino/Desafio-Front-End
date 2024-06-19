/**
 * Componente Timer que exibe um temporizador com uma barra de progresso.
 * @param {Object} props - As propriedades do componente.
 * @param {number} props.timeLeft - O tempo restante em segundos.
 * @param {number} props.timeToPlay - O tempo total de jogo em segundos.
 * @returns {JSX.Element} Um elemento JSX que representa o temporizador.
 * @example
 * <Timer timeLeft={30} timeToPlay={60} />
 */
export const Timer = ({ timeLeft, timeToPlay }) => {
	return (
		<label className="timer">
			<progress value={timeLeft / timeToPlay} max="1" />
			<span>{timeLeft < 10 ? `0${timeLeft}` : timeLeft}</span>
		</label>
	)
}
