import React, { useMemo, useState, useEffect } from 'react';
import axios from 'axios';
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
} from 'react-table';
import { columns } from './columns';
import GlobalFilter from './globalFilter';
import {
  BodyTRStyle,
  HeadStyle,
  HeadTRStyle,
  TableStyle,
  TDStyle,
  THStyle,
} from './styledComponents/style';

const Table: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [canNextPage, setCanNextPage] = useState<boolean>(false);
  const [canPreviousPage, setCanPreviousPage] = useState<boolean>(true);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [dataPage, setDataPage] = useState<number>(1);
  const [data, setData] = useState<any>([{}]);
  const [error, setError] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const {
        data: { results, count },
      } = await axios.get(`https://swapi.dev/api/planets/?page=${dataPage}`);
      let pagesTotal = Math.round(count / results.length);
      setData(results);
      setTotalPage(pagesTotal);
      setLoading(false);
      setError(false);
    } catch (err) {
      setError(false);
      setError(true);
    }
  };
  useEffect(() => {
    fetchData();
  }, [dataPage]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable({ columns, data }, useFilters, useGlobalFilter);

  const { globalFilter } = state;

  if (loading) return <p>Loading Data...</p>;

  if (error) return <p>Data cannot be fetched. Try again</p>;

  const handleNextPage = () => {
    if (dataPage === totalPage) {
      setCanNextPage(true);
      setDataPage(totalPage);
    } else {
      setCanPreviousPage(false);
      setDataPage(dataPage + 1);
    }
  };

  const handlePreviousPage = () => {
    setDataPage(dataPage - 1);
  };
  return (
    <>
      <div style={{ margin: '20px' }}>
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      </div>
      <TableStyle {...getTableProps()}>
        <HeadStyle>
          {headerGroups.map((headerGroup: any) => (
            <HeadTRStyle {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                <THStyle {...column.getHeaderProps()}>
                  {column.render('Header')}
                </THStyle>
              ))}
            </HeadTRStyle>
          ))}
        </HeadStyle>
        <tbody {...getTableBodyProps()}>
          {rows.map((row: any) => {
            prepareRow(row);
            return (
              <BodyTRStyle {...row.getRowProps()}>
                {' '}
                {row.cells.map((cell: any) => {
                  return (
                    <TDStyle {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </TDStyle>
                  );
                })}
              </BodyTRStyle>
            );
          })}
        </tbody>
        <tfoot>
          {footerGroups.map((footerGroup: any) => (
            <tr {...footerGroup.getFooterGroupProps()}>
              {footerGroup.headers.map((column: any) => (
                <td {...column.getFooterProps()}>{column.render('Footer')}</td>
              ))}
            </tr>
          ))}
        </tfoot>
      </TableStyle>
      <div style={{ marginTop: '25px' }}>
        <button onClick={handlePreviousPage} disabled={dataPage === 1}>
          Previous
        </button>{' '}
        {Array.from(Array(totalPage).keys()).map((num) => (
          <button
            disabled={dataPage === num + 1}
            onClick={() => {
              setDataPage(num + 1);
            }}
            style={{ marginRight: '10px' }}
          >
            {num + 1}
          </button>
        ))}
        <button onClick={handleNextPage} disabled={canNextPage}>
          Next
        </button>{' '}
        <span style={{ marginTop: '20px' }}>
          Page{' '}
          <strong>
            {dataPage} of {totalPage}
          </strong>{' '}
        </span>
      </div>
    </>
  );
};

export default Table;
