import themeAdmin from '../../Admin.module.scss';
import {Button, TextField} from '@mui/material';
import {useState} from 'react';
import IRestaurante from '../../../../interfaces/IRestaurante';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const AdminRestaurantesHandler = () => {

  const navigate = useNavigate();
  const [form, setForm] = useState<IRestaurante>({
    nome: '',
    id: 0,
    pratos: []
  });

  const onFormSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    console.log('send', form);
    const { nome } = form;

    if (nome) {
      axios.post('http://localhost:8000/api/v2/restaurantes/', { nome })
        .then((resp) => {
          console.log('Restaurante cadastrado com sucesso!', resp);
          alert('Restaurante cadastrado com sucesso!');
          navigate('/admin/restaurantes');
        });
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
        <div className={themeAdmin.formItem}>
          <Button type={'submit'} variant={'outlined'}>Salvar</Button>
        </div>
      </form>
    </section>
  );
}

export default AdminRestaurantesHandler;
