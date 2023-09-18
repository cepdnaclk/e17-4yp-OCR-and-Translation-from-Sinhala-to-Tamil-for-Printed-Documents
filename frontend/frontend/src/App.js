import Home from './pages/Home';
import { Routes,Route,BrowserRouter } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <BrowserRouter>
    <Routes>      
      <Route path="/" element={<Home/>}>
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
