/**
 * Ordena uma lista de tempos e retorna os 10 melhores.
 * @param {Array<{date: string, time: string}>} list - A lista de objetos contendo data e tempo.
 * @returns {Array<{date: string, time: string}>} Uma lista ordenada com os 10 melhores tempos.
 * @example
 * const list = [
 *	 {date: "19 de junho de 2024 às 15:16:31", time: "2.73"},
 *   {date: "19 de junho de 2024 às 00:55:20", time: "2.63"},
 *	 {date: "19 de junho de 2024 às 15:16:18", time: "2.85"}
 * ];
 * const topTen = getListTopTenSorted(list);
 * console.log(topTen);
 * // [
 *   {date: "19 de junho de 2024 às 00:55:20", time: "2.63"},
 *	 {date: "19 de junho de 2024 às 15:16:31", time: "2.73"},
 *	 {date: "19 de junho de 2024 às 15:16:18", time: "2.85"}
 * // ]
 */
export const getListTopTenSorted = (list) => {
  // Cria uma cópia da lista e a ordena com base no tempo (em ordem crescente)
  const sortedList = [...list].sort(
    (a, b) => parseFloat(a.time) - parseFloat(b.time)
  )

  // Retorna a lista ordenada e limita o tamanho da lista se maior que 10 ordenada a 10 elementos
  return sortedList.slice(0, 10)
}

/**
 * Reproduz um som a partir de uma fonte especificada.
 *
 * @param {string} src - O caminho para o arquivo de som.
 * @param {number} [volume=1] - O volume do som, variando de 0.0 a 1.0.
 * @param {boolean} [loop=false] - Se o som deve ser reproduzido em loop.
 * @param {number} [currentTime=0] - O tempo inicial de reprodução do som, em segundos.
 *
 * @example
 * playSound('path/to/sound.mp3', 0.5, true, 10);
 * // Reproduz o som a partir do arquivo 'path/to/sound.mp3' com volume 0.5, em loop, iniciando a partir de 10 segundos.
 */
export const playSound = (src, volume = 1, loop = false, currentTime = 0) => {
  // Cria um novo objeto de áudio com a fonte especificada.
  const audio = new Audio(src)

  // Define o tempo inicial de reprodução do som.
  audio.currentTime = currentTime

  // Define se o som deve ser reproduzido em loop.
  audio.loop = loop

  // Define o volume do som.
  audio.volume = volume

  // Inicia a reprodução do som.
  audio.play()
}

/**
 * Retorna a data e hora atuais formatadas.
 *
 * @returns {string} A data e hora atuais formatadas no padrão 'pt-BR'.
 *
 * @example
 * const currentDate = getDateCreation();
 * console.log(currentDate);
 * // Exemplo de saída: '19 de junho de 2024 14:32:10'
 */
export const getDateCreation = () => {
  // Cria um novo objeto Date e o formata de acordo com o padrão 'pt-BR'
  return new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }).format(new Date())
}

/**
 * Gera uma sequência aleatória de caracteres.
 *
 * @param {number} length - O comprimento da sequência a ser gerada.
 * @returns {string[]} Uma array contendo a sequência gerada.
 *
 * @example
 * const sequence = generateSequence(5);
 * console.log(sequence);
 * // Exemplo de saída: ["4", "9", "2", "5", "1"]
 */
export const generateSequence = (length) => {
  // Define os caracteres permitidos para a sequência.
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  // const letters = '1234567890'

  // Cria uma array com o comprimento especificado, preenchida com caracteres aleatórios.
  return Array.from(
    { length },
    () => letters[Math.floor(Math.random() * letters.length)]
  )
}

/**
 * Verifica se o dispositivo atual é um dispositivo móvel.
 *
 * @returns {boolean} Retorna `true` se o dispositivo for móvel, caso contrário `false`.
 *
 * @example
 * const mobile = isMobile();
 * console.log(mobile); // true ou false
 */
export const isMobile = () => {
  // Verifica se o user agent contém 'Mobi' ou 'Android' ou se a largura da janela é menor ou igual a 768 pixels.
  return /Mobi|Android/i.test(navigator.userAgent) || window.innerWidth <= 768
}

/**
 * Abre o teclado virtual em dispositivos móveis.
 *
 * @example
 * openKeyboard();
 * // Em um dispositivo móvel, o teclado virtual será aberto temporariamente.
 */
export const openKeyboard = (time) => {
  // Verifica se o dispositivo é móvel.
  if (isMobile()) {
    // Cria um elemento de input temporário.
    const tempInput = document.createElement('input')

    // Define a posição do input temporário para estar fora da tela.
    tempInput.style.position = 'absolute'
    tempInput.style.top = '-1000px'

    // Adiciona o input temporário ao body do documento.
    document.body.appendChild(tempInput)

    // Define o foco no input temporário para abrir o teclado virtual.
    tempInput.focus()

    // Remove o input temporário após 1 segundo.
    setTimeout(() => {
      document.body.removeChild(tempInput)
    }, time * 1000)
  }
}
