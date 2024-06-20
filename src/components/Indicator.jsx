/**
 * Componente Indicator que exibe uma sequência de letras com um indicador de posição atual.
 * @param {Object} props - As propriedades do componente.
 * @param {Array<string>} props.sequence - A sequência de letras a ser exibida.
 * @param {number} props.currentIndex - O índice atual na sequência.
 * @param {boolean} props.isPlaying - Indica se a sequência está sendo reproduzida.
 * @returns {JSX.Element} Um elemento JSX que representa o indicador de sequência.
 * @example
 * <Indicator sequence={['A', 'B', 'C']} currentIndex={1} isPlaying={true} />
 */
export const Indicator = ({ sequence, currentIndex, isPlaying }) => {
  const getClassName = (index) => {
    if (index < currentIndex) return 'active'
    if (index === currentIndex) return 'current'
    return ''
  }

  return (
    <div className="indicator">
      {isPlaying &&
        sequence.map((letra, index) => (
          <span className={getClassName(index)} key={index}>
            {letra}
          </span>
        ))}
    </div>
  )
}
