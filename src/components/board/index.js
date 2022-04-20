import tableStyles from '../../pages/common/styles/table.module.css'

// 공공데이터포털 참고데이터
// https://www.data.go.kr/data/15089266/fileData.do

const Board = () => {
    const data = [
        // Example
        // {
        //     date: '2021-05-31 11:00:00 PM',
        //     region: '평균',
        //     particulateMatter: 43,
        //     ultraParticulateMatter: 23,
        // },
    ]

    return (
        <table className={tableStyles.table}>
            <thead>
                <tr>
                    <th colSpan={4}>
                        <h2>서울특별시 시간별 (초)미세먼지</h2>
                    </th>
                </tr>
                <tr>
                    <th>일시</th>
                    <th>구분</th>
                    <th>미세먼지(PM10)</th>
                    <th>초미세먼지(PM25)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <Board.data data={data} />
                </tr>
            </tbody>
        </table>
    )
}

Board.data = function Data({ data }) {
    return (
        <>
            {data && data.length ? (
                data.map((datum) => (
                    <>
                        <td>{datum.date}</td>
                        <td>{datum.region}</td>
                        <td>{datum.particulateMatter}</td>
                        <td>{datum.ultraParticulateMatter}</td>
                    </>
                ))
            ) : (
                <td colSpan={4}>데이터가 없습니다.</td>
            )}
        </>
    )
}

export default Board
