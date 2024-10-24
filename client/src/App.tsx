import { Routes, Route } from 'react-router-dom';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';
import AdminRestaurantes from './paginas/Admin/Restaurantes';
import AdminRestaurantesHandler from './paginas/Admin/Restaurantes/Handler';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path="/admin/restaurantes" element={<AdminRestaurantes />} />
      <Route path="/admin/restaurantes/add" element={<AdminRestaurantesHandler />} />
      <Route path="/admin/restaurantes/:id" element={<AdminRestaurantesHandler />} />
    </Routes>
  );
}

export default App;
