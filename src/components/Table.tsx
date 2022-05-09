import React, { useMemo, useState, useEffect } from 'react';
import axios from 'axios';
import { useTable, usePagination, useFilters, useGlobalFilters  } from 'react-table';
import useAxios from 'axios-hooks';
import globalFilter from './globalFilter'
import { columns } from './columns';


const Table: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [dataPage, setDataPage] = useState<number>(1)
  const [data, setData] = useState<any>([]);

  const fetchData = async () => {
    const { data:{results} } = await axios.get(`https://swapi.dev/api/planets/?page=${dataPage}`);
    setData(results);
    // setLoading(false)
  };
//   if(loading) {return <h1>Loading .....</h1>}

  useEffect(()=> {
      fetchData()
  }, [dataPage])


  const {getTableProps, getTableBodyProps, headerGroups, footerGroups, rows, prepareRow} = useTable({columns, data})

  return(
    <>
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
  </>
  )
  
};

export default Table;

