import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import {useEffect, useState} from 'react';
import axios, {AxiosResponse} from 'axios';
import {IPaginacao} from '../../interfaces/IPaginacao';
import {Button} from '@mui/material';
// import jsonRestaurantes from './restaurantes.json'; // codigo inicial


const ListaRestaurantes = () => {

  // const restaurantes: IRestaurante[] = [...jsonRestaurantes] // codigo inicial

  const [ nextPage, setNextPage ] = useState<string>('');
  const [ restaurantes, setRestaurantes ] = useState<IRestaurante[]>([]);

  const verMais = () => {
    axios.get<IPaginacao<IRestaurante>>(nextPage)
      .then((resp)=> {
        console.log(`[${(new Date().toLocaleTimeString())}] get restaurantes ${nextPage}`, resp, );
        const { results, next } = resp?.data;
        results?.length && setRestaurantes([ ...restaurantes, ...results ]);
        setNextPage(next || '');
      });
  }

  useEffect(() => {
    axios.get<IPaginacao<IRestaurante>>('http://localhost:8000/api/v1/restaurantes/')
      .then((resp)=> {
        console.log(`[${(new Date().toLocaleTimeString())}] get restaurantes`, resp, );
        const { results, next } = resp?.data;
        results?.length && setRestaurantes([ ...results ]);
        setNextPage(next || '');
      });
  }, []);

  return (<section className={style.ListaRestaurantes}>
    <h1>Os restaurantes mais <em>bacanas</em>!</h1>
    <form>

    </form>
    {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
    {nextPage && <Button variant={'outlined'} onClick={verMais}>Ver mais</Button>}
  </section>)
}

export default ListaRestaurantes
