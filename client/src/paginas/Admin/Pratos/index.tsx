import {useCallback, useEffect, useState} from 'react';
import {
  Box,
  Button, FormControl, InputLabel, MenuItem,
  Paper, Select, SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import {AxiosResponse} from 'axios';
import styles from '../Restaurantes/AdminRestaurantes.module.scss';
import themeAdmin from '../Admin.module.scss';
import { useNavigate } from 'react-router-dom';
import {IPaginacao} from '../../../interfaces/IPaginacao';
import http from '../../../core/Http';
import IPrato from '../../../interfaces/IPrato';


let timeout: number|null  = null;

export default function AdminPratos() {
  const v1Url = 'v2/pratos/';

  const [order, setOrder] = useState<string>('id');
  const [actualPage, setActualPage] = useState<number|null>(null);
  const [pagination, setPagination] =
    useState<{next:string|null, prev:string|null}>({next: null, prev: null});
  const [pratos, setPratos] = useState<IPrato[]>([]);
  const [search, setSearch] = useState<string>('');
  const navigate = useNavigate();

  const extractParamValueFromUrl = (url: string, key: string) => {
    if (url) {
      const rex = new RegExp(`${key}=\\w*`, 'gi');
      const param = url.match(rex);
      return param && param.length ? param[0].split('=')[1] : null;
    }
    return null;
  }

  const respPratos = useCallback((resp: any) => {
    console.log('resp pratos', resp);
    // setPratos(resp);
    // setPagination({
    //   prev: resp.data.previous ? resp.data.previous.replace('http://localhost:8000/api/', '') : resp.data.previous,
    //   next: extractParamValueFromUrl(resp.data.next, 'page')
    // });
  }, []);

  const callbackLoadList = (page: number|null = null) => {
    let url = v1Url;

    // if (page) {
    //   url += `${url.match(/\?/gi) ? '&' : '?'}page=${page}`;
    // }
    //
    // if(search) {
    //   url += `${url.match(/\?/gi) ? '&' : '?'}search=${search}`;
    // }
    // if(order) {
    //   url += `${url.match(/\?/gi) ? '&' : '?'}ordering=${order}`;
    // }

    http.get<AxiosResponse<IPrato[], any>>(url)
      .then(respPratos);
  }

  const loadList = useCallback(callbackLoadList, [search, order, respPratos]);

  useEffect(()=> {
    if (timeout) { clearTimeout(timeout); }
    timeout = window.setTimeout(() => {
      loadList(actualPage);
    }, 500);
  }, [search, order, actualPage, loadList]);

  const addItem = () => {
    navigate('/admin/pratos/add');
  }

  const deleteItem = (id:number) => {
    http.delete(`v2/pratos/${id}/`)
      .then(()=>{
        setPratos(pratos.filter(restaurante => restaurante.id !== id));
        console.log('Restaurante removido com sucesso!');
        alert('Restaurante removido com sucesso!');
      })
  }

  const editItem = (id:number) => {
    navigate(`/admin/pratos/${id}`);
  }

  const prevPage = () => {
    if (pagination.prev) {
      const page = Number(pagination.prev);
      setActualPage(isNaN(page) ? null : page);
    }
  }

  const nextPage = () => {
    if (pagination.next) {
      const page = Number(pagination.next);
      setActualPage(isNaN(page) ? null : page);
    }
  }

  const onFilterChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(ev.target.value);
  }

  const onOrderChange = (ev: SelectChangeEvent) => {
    setOrder(ev.target.value);
  };

  return (
    <>
      <h1>Admin Pratos</h1>
      <Box className={styles.topActions}>
        <span />
        <FormControl fullWidth>
          <InputLabel id="selectOrderLabel">Ordenação</InputLabel>
          <Select label="Ordenação"
                  labelId="selectOrderLabel"
                  id="selectOrder"
                  value={order}
                  onChange={onOrderChange}>
            <MenuItem value={'id'}>Id</MenuItem>
            <MenuItem value={'nome'}>Nome</MenuItem>
          </Select>
        </FormControl>
        <TextField label={'Filtro'} value={search} onChange={onFilterChange} />
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Prato</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Tag</TableCell>
              <TableCell>Imagem</TableCell>
              <TableCell align={'center'}>Editar</TableCell>
              <TableCell align={'center'}>Excluir</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              pratos.map((prato) => (
                <TableRow key={prato.id}>
                  <TableCell>{prato.nome}</TableCell>
                  <TableCell>{prato.descricao}</TableCell>
                  <TableCell>{prato.tag}</TableCell>
                  <TableCell>{prato.imagem}</TableCell>
                  <TableCell align={'center'}>
                    <Button variant={'outlined'} color={'warning'}
                            onClick={()=> editItem(prato.id)}>&#128221;</Button>
                  </TableCell>
                  <TableCell align={'center'}>
                    <Button variant={'outlined'} color={'error'}
                            onClick={()=> deleteItem(prato.id)}>&#10060;</Button>
                  </TableCell>
                </TableRow>
              ))
            }
            <TableRow>
              <TableCell colSpan={6}>
                <div className={themeAdmin.tableActions}>
                  <Button variant={'outlined'} onClick={prevPage} disabled={!Boolean(pagination.prev)}>Prev</Button>
                  <span />
                  <Button variant={'outlined'} onClick={nextPage} disabled={!Boolean(pagination.next)}>Next</Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
