import themeAdmin from '../../Admin.module.scss';
import {Button, ButtonGroup, TextField} from '@mui/material';
import {useEffect, useState} from 'react';
import IRestaurante from '../../../../interfaces/IRestaurante';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';

const AdminRestaurantesHandler = () => {

  const navigate = useNavigate();
  const params = useParams();
  const [form, setForm] = useState<IRestaurante>({
    nome: '',
    id: 0,
    pratos: []
  });

  useEffect(() => {
    console.log('params', params);
    if (params.id) {
      axios.get<IRestaurante>(`http://localhost:8000/api/v2/restaurantes/${params.id}/`)
        .then(resp => setForm({ ...resp.data }));
    }
  }, [params]);

  const back = () => {
    navigate('/admin/restaurantes');
  }

  const onFormSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    console.log('send', form);
    const { nome } = form;

    if (nome) {
      if (params.id) {
        axios.put(`http://localhost:8000/api/v2/restaurantes/${params.id}/`, { nome })
          .then((resp) => {
            console.log('Restaurante editado com sucesso!', resp);
            alert('Restaurante editado com sucesso!');
            navigate('/admin/restaurantes');
          });
      } else {
        axios.post('http://localhost:8000/api/v2/restaurantes/', { nome })
          .then((resp) => {
            console.log('Restaurante cadastrado com sucesso!', resp);
            alert('Restaurante cadastrado com sucesso!');
            navigate('/admin/restaurantes');
          });
      }
    }

  };

  return (
    <section className={themeAdmin.container}>
      <h1>Cadastrar Restaurante</h1>
      <form onSubmit={onFormSubmit}>
        <div className={themeAdmin.formItem}>
          <TextField id="nome" label="Nome do Restaurante" variant="standard" value={form.nome}
                    onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {setForm({...form, nome: ev.target.value})}} />
        </div>
        <ButtonGroup variant={'outlined'}>
          <Button type={'button'} onClick={back}>Voltar</Button>
          <Button type={'submit'}>Salvar</Button>
        </ButtonGroup>
      </form>
    </section>
  );
}

export default AdminRestaurantesHandler;
