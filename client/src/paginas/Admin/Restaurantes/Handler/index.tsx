import themeAdmin from '../../Admin.module.scss';
import {Box, Button, ButtonGroup, TextField} from '@mui/material';
import {useEffect, useState} from 'react';
import IRestaurante from '../../../../interfaces/IRestaurante';
import {useNavigate, useParams} from 'react-router-dom';
import http from '../../../../core/Http';

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
      http.get<IRestaurante>(`v2/restaurantes/${params.id}/`)
        .then(resp => setForm({ ...resp.data }));
    }
  }, [params]);

  const back = () => {
    navigate('/admin/restaurantes');
  }

  const onFormSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const { nome } = form;

    if (nome) {
      if (params.id) {
        http.put(`v2/restaurantes/${params.id}/`, { nome })
          .then((resp) => {
            console.log('Restaurante editado com sucesso!', resp);
            alert('Restaurante editado com sucesso!');
            navigate('/admin/restaurantes');
          });
      } else {
        http.post('v2/restaurantes/', { nome })
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
      <Box component={'form'} onSubmit={onFormSubmit}>
        <div className={themeAdmin.formItem}>
          <TextField id="nome" label="Nome do Restaurante" variant="standard" value={form.nome} required={true}
                    onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {setForm({...form, nome: ev.target.value})}} />
        </div>
        <ButtonGroup variant={'contained'}>
          <Button variant={'outlined'} type={'button'} onClick={back}>Voltar</Button>
          <Button type={'submit'}>Salvar</Button>
        </ButtonGroup>
      </Box>
    </section>
  );
}

export default AdminRestaurantesHandler;
