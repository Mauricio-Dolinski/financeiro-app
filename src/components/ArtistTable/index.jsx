
import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useTable, usePagination, useSortBy } from 'react-table';
import './styles.css'
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { toast} from "react-toastify";

export function ArtistTable() {

  const [posts, setPosts] = useState([]);
  const [fetchdata, setData] = useState([]);

  const GetArtistsInfo = async () => {
    await axios.get('http://localhost:9080/artists').then(response => {
        const artists = response.data;
        for (const artist of artists) {
          const { albums, ...rest } = artist;
          for (const album of albums) {
            setPosts([...posts, { ...rest, ...album }]);
            posts.push({ ...rest, ...album });
          }
        };
      }).catch(error => { toast.error("e: " + error); });
  };
  const data = useMemo(() => [...posts], [posts]);
  const columns = useMemo(() => [{
    Header: 'Artist Info',
    columns: [
      {
        Header: 'Artist ID',
        accessor: 'id'
      },
      {
        Header: 'Artist Name',
        accessor: 'name'
      },
      {
        Header: 'Genres',
        accessor: 'genres',
      }
    ]
  },
  {
    Header: 'Albums',
    columns: [
      {
        Header: 'Number of Tracks',
        accessor: 'ntracks',
      },
      {
        Header: 'Title',
        accessor: 'title',
      }
    ]
  }
  ], []
  );
  
  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 4 }
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
	  //toast.error("useEffect");
    GetArtistsInfo(); 
  }, []);

  return (
    <Container component="table" maxWidth="100%" sx={{ margin: 0}}>
      <Box sx={{ m: 2, p: 1, bgcolor: "#ffffff", borderRadius: 5, boxShadow: "2px 2px 10px -3px"}}>
	      <table {...getTableProps()}>
	        <thead>
	          {headerGroups.map(headerGroup => (
	            <tr {...headerGroup.getHeaderGroupProps()}>
	              {headerGroup.headers.map((column) => (
	                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
	                  {column.render('Header')}
	                  <span>
	                    {column.isSorted
	                      ? column.isSortedDesc
	                        ? ' 🔽'
	                        : ' 🔼'
	                      : ''}
	                  </span>
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
	                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
	                })}
	              </tr>
	            )
	          })}
	        </tbody>
	      </table>
	      <div className="pagination">
	        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
	          {'Previous'}
	        </button>{' '}
	        <div class="page-info">
	          <span>
	            Page{' '}
	            <strong>
	              {pageIndex + 1} of {pageOptions.length}
	            </strong>{' '}
	          </span>
	          <span>
	            | Go to page:{' '}
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
	          <select
	            value={pageSize}
	            onChange={e => {
	              setPageSize(Number(e.target.value))
	            }}
	          >
	            {[4, 5, 6, 9].map(pageSize => (
	              <option key={pageSize} value={pageSize}>
	                Show {pageSize}
	              </option>
	            ))}
	          </select>
	        </div>
	        <button onClick={() => nextPage()} disabled={!canNextPage}>
	          {'Next'}
	        </button>{' '}
	      </div>
	    </Box>
	  </Container>
  );
}