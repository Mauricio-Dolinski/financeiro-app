
import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useTable, usePagination, useSortBy } from 'react-table';
import './styles.css'
import Box from "@mui/material/Box";
import { toast} from "react-toastify";
import {BiSolidDownArrow, BiSolidUpArrow} from "react-icons/bi";
import Button from "@mui/material/Button";

export function Table({url, colunastest, size}) {

  const [rows, setRows] = useState([]);
  
  const GetData = async () => {
    await axios.get('https://jsonplaceholder.typicode.com/'+url).then(response => {
        const entities = response.data;
        for (const entity of entities) {
          setRows([...rows, { ...entity }]);
          rows.push({ ...entity });
        };
        rows.length = 0;
        
      }).catch(error => { 
		toast.error("e: " + error, {
      	toastId: "networkError"
    	});
      });
  };
  const data = useMemo(() => [...rows], [rows]);
  const columns = useMemo(() => colunastest, []
  );
  
  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: size }
    },
    useSortBy,
    usePagination
  )
  
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = tableInstance;

  useEffect(() => {
    GetData(); 
  }, []);

  return (
      <Box sx={{ marginX: '25px', p: 2, bgcolor: "#ffffff", borderRadius: 5, boxShadow: "2px 2px 10px -3px"}}>
	      <table {...getTableProps()}>
	        <thead>
	          {headerGroups.map(headerGroup => (
	            <tr {...headerGroup.getHeaderGroupProps()}>
	              {headerGroup.headers.map((column) => (
	                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
	                  {column.render('Header')}
	                  
	                    {column.isSorted
	                      ? column.isSortedDesc
	                        ? <> <span> </span> <BiSolidUpArrow className='arrowup'/> </>
	                        : <> <span> </span> <BiSolidDownArrow className='arrowdown'/> </>
	                      : ''}
	                  
	                </th>
	              ))}
	            </tr>
	          ))}
	        </thead>
	        <tbody {...getTableBodyProps()}>
	          {page.map((row, i) => {
	            prepareRow(row)
	            return (
	              <tr {...row.getRowProps()}>
	                {row.cells.map(cell => {
	                  return (
						  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
					  )
	                })}
	              </tr>
	            )
	          })}
	        </tbody>
	      </table>
	      <div className="pagination">
	        <Button variant="outlined" onClick={() => previousPage()} disabled={!canPreviousPage}>
	          {'Voltar'}
	        </Button>{' '}
	        <div class="page-info">
	          <span>
	            Página{' '}
	            <strong>
	              {pageIndex + 1} de {pageOptions.length}
	            </strong>{' '}
	          </span>
	          <span>
	            Ir para página:{' '}
	            <input
	              type="number"
	              defaultValue={pageIndex + 1}
	              onChange={e => {
	                const page = e.target.value ? Number(e.target.value) - 1 : 0
	                gotoPage(page)
	              }}
	              style={{ width: '100px' }}
	            />
	          </span>{' '}
	        </div>
	        <Button variant="outlined" onClick={() => nextPage()} disabled={!canNextPage}>
	          {'Próximo'}
	        </Button>{' '}
	      </div>
	    </Box>
  );
}