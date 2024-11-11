import { Routes, Route } from 'react-router-dom';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';
import AdminRestaurantes from './paginas/Admin/Restaurantes';
import AdminRestaurantesHandler from './paginas/Admin/Restaurantes/Handler';
import AdminStructure from './paginas/Admin';
import AdminPratos from './paginas/Admin/Pratos';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />

      <Route path="/admin" element={<AdminStructure />}>

        <Route path="restaurantes" element={<AdminRestaurantes />} />
        <Route path="restaurantes/add" element={<AdminRestaurantesHandler />} />
        <Route path="restaurantes/:id" element={<AdminRestaurantesHandler />} />

        <Route path="pratos" element={<AdminPratos />} />
      </Route>

    </Routes>
  );
}

export default App;
