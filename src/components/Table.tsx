import React, { useMemo, useState, useEffect } from 'react';
import axios from 'axios';
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table'
import { columns } from './columns';
import GlobalFilter from './GlobalFilter';


const Table: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [canNextPage, setCanNextPage] = useState<boolean>(false);
  const [canPreviousPage, setCanPreviousPage] = useState<boolean>(true);
  const [totalPage, setTotalPage] = useState<number>(1)
  const [dataPage, setDataPage] = useState<number>(1)
  const [data, setData] = useState<any>([{}]);
  const [error, setError] = useState<boolean>(false)

  const fetchData = async () => {
    try{
        const { data:{results, count} } = await axios.get(`https://swapi.dev/api/planets/?page=${dataPage}`);
        let pagesTotal =  Math.round(count / results.length)
        setData(results);
        setTotalPage(pagesTotal)
        setLoading(false)
        setError(false)
    }catch(err){
        setError(true)
    }
  };
  useEffect(()=> {
    fetchData()
}, [dataPage])

const {getTableProps, getTableBodyProps, headerGroups, footerGroups, rows, prepareRow, previousPage, pageCount, state, setGlobalFilter } = useTable({columns, data}, useFilters, useGlobalFilter)

const {globalFilter} = state

console.log(globalFilter)

if(loading) return <p>Loading Data...</p>
 
if(error) return <p>Data cannot be fetched. Try again</p>

  const handleNextPage = () => {
      if(dataPage === totalPage){
          setCanNextPage(true)
          setDataPage(totalPage)
      }else {
          setCanPreviousPage(false)
          setDataPage(dataPage + 1)
      }
  }

  const handlePreviousPage = () => {
    if(dataPage !== 1){
        setCanPreviousPage(true)
        setDataPage(dataPage)
    }else {
        setDataPage(dataPage - 1)
    }
}
  return(
    <>
    <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup: any) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column:any) => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row:any)=> {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}> {row.cells.map((cell:any) => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
      <tfoot>
        {footerGroups.map((footerGroup:any) => (
          <tr {...footerGroup.getFooterGroupProps()}>
            {footerGroup.headers.map((column:any) => (
              <td {...column.getFooterProps()}>{column.render('Footer')}</td>
            ))}
          </tr>
        ))}
      </tfoot>
    </table>
    <div>
        <button onClick={handlePreviousPage} disabled={canPreviousPage}>
          Previous
        </button>{' '}
        <button onClick={handleNextPage} disabled={canNextPage}>
          Next
        </button>{' '}
        <span>
          Page{' '}
          <strong>
                {dataPage} of {totalPage}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type='number'
            defaultValue={1}
            onChange={e => {
              const pageNumber = e.target.value ? Number(e.target.value) : 1
              setDataPage(pageNumber)
            }}
            style={{ width: '50px' }}
          />
        </span>{' '}
      </div>
  </>
  )
  
};

export default Table;

