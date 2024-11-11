import {AppBar, Box, Button, Container, Link, Toolbar, Typography} from '@mui/material';
import themeAdmin from './Admin.module.scss';
import {Link as RouterLink, Outlet} from 'react-router-dom';

const AdminStructure = () => {

  return (
    <>
      <AppBar position={'static'}>
        <Container maxWidth={'xl'}>
          <Toolbar>
            <Typography>Admin</Typography>
            <Box className={themeAdmin.appBarBox}>
              <Link component={RouterLink} to={'/admin/restaurantes'}>
                <Button>Restaurantes</Button>
              </Link>
              <Link component={RouterLink} to={'/admin/restaurantes/add'}>
                <Button>Cadastrar Restaurante</Button>
              </Link>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Box className={themeAdmin.adminContainer}>
        <Container maxWidth={'lg'}>
          <Outlet />
        </Container>
      </Box>
    </>
  )
};

export default AdminStructure;
