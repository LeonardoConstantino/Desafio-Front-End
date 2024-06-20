import { getListTopTenSorted } from '../utils/helpers.js'

/**
 * Componente TableTopTen que renderiza uma tabela dos 10 melhores tempos.
 * @param {Object} props - As propriedades do componente.
 * @param {Array<Object>} props.list - A lista de objetos contendo as informações dos melhores tempos.
 * @param {string} props.list[].date - A data associada ao tempo.
 * @param {string} props.list[].time - O tempo registrado.
 * @returns {JSX.Element} Um elemento JSX que representa a tabela dos 10 melhores tempos.
 * @example
 * const topTenList = [
 *   {date: "19 de junho de 2024 às 00:55:20", time: "2.63"},
 *   {date: "19 de junho de 2024 às 00:55:25", time: "3.07"},
 *   // mais dados...
 * ];
 * <TableTopTen list={topTenList} />
 */
export const TableTopTen = ({ list }) => {
  const sortedList = getListTopTenSorted(list)

  return (
    <>
      <hr />
      <h2>Top 10 melhores tempos</h2>
      <table>
        <thead>
          <tr>
            <th>Top</th>
            <th>Data</th>
            <th>Tempo</th>
          </tr>
        </thead>
        <tbody>
          {sortedList.map(({ date, time }, index) => (
            <tr key={`${date}-${index}`}>
              <td>{index + 1}º</td>
              <td>{date}</td>
              <td>{parseFloat(time).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
