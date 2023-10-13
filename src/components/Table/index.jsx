
import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useTable, usePagination, useSortBy } from 'react-table';
import './styles.css'
import Box from "@mui/material/Box";
import { toast} from "react-toastify";
import {BiSolidDownArrow, BiSolidUpArrow} from "react-icons/bi";
import Button from "@mui/material/Button";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { LuEdit, LuCheckCircle} from "react-icons/lu";
import {BsFillTrashFill} from "react-icons/bs";
import { useNavigate, useLocation } from "react-router-dom";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { Select, Avatar, Typography, MenuItem, InputLabel, FormControl, TextField} from "@mui/material";

export function Table({url, colunas, size}) {

  const [rows, setRows] = useState([]);
  const [user] = useLocalStorage("user", null);
  const [renderEdit, setRenderEdit] = useState(false);
  const [renderDelete, setRenderDelete] = useState(false);
  const [renderConfirm, setRenderConfirm] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [entityId, setEntityId] = useState(-1);
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname.split('/').pop();

  const funcRenderDelete = () => {
  	if (user.role.includes("Admin")) setRenderDelete(true);
  }

  const funcRenderEdit = () => {
  	if (user.role.includes("Admin")) setRenderEdit(true);
  	else if (user.role.includes("Operador")) setRenderEdit(true);
  }

  const getData = async () => {
	rows.length = 0;
    await axios.get('http://localhost:8080/api/'+url, {
			auth: {
				username: user.user,
  				password: user.password
			}
		}).then(response => {
		setRows([...rows, ]);
        const entities = response.data;
        if (response.data === null){
					setRows([...rows, { ...entities }]);
					rows.push({ ...entities });
					return;
				}
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

  const editEntity = (rowid) => {
		const id = rows[rowid].id;
		navigate("/"+url+"/editar/"+id, { replace: true })
	}

	const openConfirmDialog = (rowid) => {
		const id = rows[rowid].id;
		const status = rows[rowid].status;
		if (!status.includes('À ')){
			return;
		}
		setEntityId(id);
		setConfirmDialogOpen(true);
	}

	const openDeleteDialog = (rowid) => {
			const id = rows[rowid].id;
			setEntityId(id);
			setDeleteDialogOpen(true);
	}

	const handleConfirmDialogClose = () => {
    setConfirmDialogOpen(false);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };
  
  const deleteEntity = async () => {
	handleDeleteDialogClose();
	const id = entityId;
		if (user){
			if (toast.isActive(url + "_" + id + "_delete_toast")){
				toast.update(url + "_" + id + "_delete_toast", {render: "Deletando "+ url+" "+id+"...", type: "loading", isLoading: true, hideProgressBar: true, autoClose: false, closed: false});
			}
			else{
				toast.loading("Deletando id: "+id+"...", {
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

	const showResponse = (toastId, options, response) => {
		//setIsWaitingData(false);
		options.render = response.data;
		if (response.data === "Cadastrado" || response.data === "Editado"|| response.data === "Confirmado"){
			options.type = "success";
			toast.update(toastId, options);
			navigate("/"+pathname, { replace: true });
		}
		else{
			toast.update(toastId, options);
		}
	}
	
	const showError = (toastId, options, error) => {
		//setIsWaitingData(false);
		if (error.response && error.response.status === 401){
					  options.render = "Acesso negado";
				  }
				  else {
					  options.render = "Servidor de login offline";
					  
				  }
				  toast.update(toastId, options);
	}

	const confirmEntity = async (event) => {
		event.preventDefault();

		setConfirmDialogOpen(false);
		const id = entityId;

		const data = new FormData(event.currentTarget);
    const params = new URLSearchParams(data);

    if (data){
		//setIsWaitingData(true);
		const renderLabel = "Confirmando...";
		const options = {render: renderLabel, 
						type: "error", 
						isLoading: false, 
						hideProgressBar: false, 
						autoClose: 3000, 
						closed: false};
		

		const toastId = toast.loading(renderLabel, {
  			closeButton: true, 
  			closeOnClick: true
		});

		const config = {
					headers: {
		            	"content-type": "application/x-www-form-urlencoded"
		        	},
					auth: {
							username: user.user,
		  				password: user.password
					}
				};
		
		 	await axios.put("http://localhost:8080/api/"+url+"/"+id, params.toString(), config).then(response => {
					showResponse(toastId, options, response);
		    }).catch(error => { 
					showError(toastId, options, error);
		    });
			  getData();
    }
	}

	const testFunc = (rowid) => {
			if (null == rows[rowid]){
				return false;
			}
			const status = rows[rowid].status;
			if (status.includes('À ')){
				return true;
			}
			return false;
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

    switch(pathname) {
	  case "receitas":
	  	funcRenderDelete()
	    break;
	  case "receitas":
	    funcRenderDelete()
	    break;
	  case "contas-a-receber":
	    if (!user.role.includes("Motorista")) setRenderConfirm(true);
	    break;
	  case "despesas":
	    funcRenderDelete()
	    break;
	  case "contas-a-pagar":
	    if (!user.role.includes("Motorista")) setRenderConfirm(true);
	    break;
	  default:
	  	funcRenderDelete();
	  	funcRenderEdit();
		}
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
	              {renderEdit && <th>Editar</th>}
	          	  {renderDelete && <th>Excluir</th>}
	          	  {renderConfirm && <th>Confirmar</th>}
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
	                {renderEdit && <td><LuEdit className="edit-btn" onClick={() => {editEntity(row.id)}}/></td>}
	          			{renderDelete && <td><BsFillTrashFill className="delete-btn" onClick={() => {openDeleteDialog(row.id)}}/></td>}
	          			{renderConfirm && <td><LuCheckCircle className={testFunc(row.id) ? "confirm-btn" : "confirmed-btn"} onClick={() => {openConfirmDialog(row.id)}}/></td>}
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
	      
			    <Dialog 
		        open={confirmDialogOpen}
		        onClose={handleConfirmDialogClose}
		        aria-labelledby="alert-dialog-title"
		        aria-describedby="alert-dialog-description"
		      >
		        <DialogTitle id="alert-dialog-title">
		        	<Typography color="#2e7d32" variant="h5" sx={{fontWeight: 'bold'}}>
					      Deseja confirmar a transação {entityId}?
					    </Typography>
		        </DialogTitle>
		        <DialogContent>
		          <DialogContentText id="alert-dialog-description">
		          	<Box component="form" id="my-form" onSubmit={confirmEntity} sx={{ alignItems: 'center', p: 2}}>
			          	<FormControl fullWidth>
				          	<InputLabel id="tipo">Tipo de Transação</InputLabel>
				            <Select
									  	margin="0px"
									    id="tipo"
									    label="Tipo de Transação"
									    name="tipo"
									    defaultValue="Transferência"
										>
									  	<MenuItem value="Transferência">Transferência</MenuItem>
									  	<MenuItem value="Pix">Pix</MenuItem>
									  	<MenuItem value="Dinheiro">Dinheiro</MenuItem>
								  	</Select>
							  	</FormControl>
							  </Box>
							  Esta ação não poderá ser revertida.
		          </DialogContentText>
		        </DialogContent>
		        <DialogActions>
		          	<Button onClick={handleConfirmDialogClose} sx={{ display: 'flex', height: '60px', borderRadius: 5, paddingX: '15px'}}>
					        <Typography variant="h6" sx={{fontWeight: 'bold'}}>
					          Cancelar
					        </Typography>
				        </Button>
		          <Box sx={{border: 'solid 2px', borderColor: '#2e7d32', alignSelf: 'center', marginX: '25px', p: '0px',  bgcolor: "#ffffff", borderRadius: 5, boxShadow: "2px 2px 10px -3px"}}>
			          <Button type="submit" form="my-form" sx={{ display: 'flex', height: '60px', borderRadius: 5, paddingX: '15px'}}>
				          <LuCheckCircle className="confirm-btn" />
					        <Typography color="#2e7d32" variant="h6" sx={{fontWeight: 'bold'}}>
					          Confirmar
					        </Typography>
				        </Button>
		        	</Box>
		        </DialogActions>
		      </Dialog>
	      <Dialog 
	        open={deleteDialogOpen}
	        onClose={handleDeleteDialogClose}
	        aria-labelledby="alert-dialog-title"
	        aria-describedby="alert-dialog-description"
	      >
	        <DialogTitle id="alert-dialog-title">
	        	<Typography color="#DB4437" variant="h5" sx={{fontWeight: 'bold'}}>
				      Deseja deletar o registro {entityId}?
				    </Typography>
	        </DialogTitle>
	        <DialogContent>
	          <DialogContentText id="alert-dialog-description">
	          	 Esta ação não poderá ser revertida.
	          </DialogContentText>
	        </DialogContent>
	        <DialogActions>
	          	<Button onClick={handleDeleteDialogClose} sx={{ display: 'flex', height: '60px', borderRadius: 5, paddingX: '15px'}}>
				        <Typography variant="h6" sx={{fontWeight: 'bold'}}>
				          Cancelar
				        </Typography>
			        </Button>
	          <Box sx={{border: 'solid 2px', borderColor: '#DB4437', alignSelf: 'center', marginX: '25px', p: '0px',  bgcolor: "#ffffff", borderRadius: 5, boxShadow: "2px 2px 10px -3px"}}>
		          <Button onClick={deleteEntity} sx={{ display: 'flex', height: '60px', borderRadius: 5, paddingX: '15px'}}>
			          <BsFillTrashFill className="delete-btn" />
				        <Typography color="#DB4437" variant="h6" sx={{fontWeight: 'bold'}}>
				          Deletar
				        </Typography>
			        </Button>
	        	</Box>
	        </DialogActions>
	      </Dialog>
	    </Box>
  );
}