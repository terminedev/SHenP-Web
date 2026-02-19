// import SpaRoutes from 'routes/SpaRoutes';

import { BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';


function App() {

  // return (<SpaRoutes />)

  return (
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  )
}

export default App;
