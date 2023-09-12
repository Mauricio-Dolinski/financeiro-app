
import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useTable, usePagination, useSortBy } from 'react-table';
import './styles.css'
import Box from "@mui/material/Box";
import { toast} from "react-toastify";
import {BiSolidDownArrow, BiSolidUpArrow} from "react-icons/bi";
import Button from "@mui/material/Button";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { LuEdit} from "react-icons/lu";
import {BsFillTrashFill} from "react-icons/bs";
import { useNavigate } from 'react-router-dom';

export function Table({url, colunas, size}) {

  const [rows, setRows] = useState([]);
  const [user] = useLocalStorage("user", null);
  const navigate = useNavigate();
  
  const getData = async () => {
	rows.length = 0;
    await axios.get('http://localhost:8080/api/'+url, {
			auth: {
				username: user.user,
  				password: user.password
			}
		}).then(response => {
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
  const columns = useMemo(() => colunas, []
  );
  
  const deleteEntity = async (rowid) => {
	
	const id = rows[rowid].id;
		if (user){
			if (toast.isActive(url + "_" + id + "_delete_toast")){
				toast.update(url + "_" + id + "_delete_toast", {render: "Deletando "+ url+" "+id+"...", type: "loading", isLoading: true, hideProgressBar: true, autoClose: false, closed: false});
			}
			else{
				toast.loading("Deletando "+ url+" "+id+"...", {
	      			toastId: url + "_" + id + "_delete_toast", closeButton: true, closeOnClick: true
	    		});
			}
		    await axios.delete("http://localhost:8080/api/"+url+"/"+id, {
				auth: {
					username: user.user,
	  				password: user.password
				}
			}).then(response => {
		        toast.update(url + "_" + id + "_delete_toast", {render: "Deletado", type: "success", isLoading: false, hideProgressBar: false, autoClose: 200});
	      }).catch(error => {
			  getData(); 
			  if (error.response && error.response.status === 401){
				    toast.update(url + "_" + id + "_delete_toast", {render: "Algo deu errado", type: "error", isLoading: false, hideProgressBar: false, autoClose: 3000});
			  }
			  else {
				  toast.update(url + "_" + id + "_delete_toast", {render: "Servidor offline", type: "error", isLoading: false, hideProgressBar: false, autoClose: 3000});
			  }
	      });
	      getData();
	    }
	};
	
  const editEntity = (rowid) => {
	  		const id = rows[rowid].id;
	  		navigate("/"+url+"/editar/"+id, { replace: true })
	  	}
	  	
	  	
	
  
  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: Number(size) }
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
    getData(); 
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
	              <th>Editar</th>
	          	  <th>Excluir</th>
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
	                <td><LuEdit className="edit-btn" onClick={() => {editEntity(row.id)}}
					 /></td>
	          		<td><BsFillTrashFill className="delete-btn" onClick={() => {deleteEntity(row.id)}}/></td>
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