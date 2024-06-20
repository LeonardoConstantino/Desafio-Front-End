// Defina uma constante para a chave do localStorage
export const LIST_TOP_TEN_KEY = 'ListTopTen'

// Tempo total de jogo em segundos.
export const timeToPlay = 10

// Recupera a lista dos 10 melhores tempos do armazenamento local.
export const listTopTenStorage = localStorage.getItem(LIST_TOP_TEN_KEY)
