import './App.css';

import { Home } from "./Home";
import User from './User';
import Product from './Product';
import Login from './Login';
import { Navigation } from './Navigation';
import Logo from './logo';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import ProductList from './ProductList';
import ProductsDonor from './ProductsDonor';

function App() {
  const [user, setUser] = useAuth()
  return (
    <BrowserRouter>
      <div className="container">
        {!user ? (
          <Login />
        ) : (
          <>
            <Logo />
            <h3 className="m-3 d-flex justify-content-center">
              Doações
            </h3>
            <Navigation />
            <Routes>
              <Route path='/entrar' element={<Login />} exact />
              <Route path='/' element={<Home />} exact />
              <Route path='/listagem-produtos' element={<ProductList />} />
              <Route path='/meus-produtos' element={<ProductsDonor />} />
              <Route path='/cadastrar-produtos' element={<Product />} />
            </Routes>
          </>
        )}

      </div>
    </BrowserRouter>
  );
}

export default App;
