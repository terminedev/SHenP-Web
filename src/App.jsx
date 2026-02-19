// import SpaRoutes from 'routes/SpaRoutes';

import { BrowserRouter } from 'react-router-dom';
import CompleteCatalog from './pages/CompleteCatalog';


function App() {

  // return (<SpaRoutes />)

  return (
    <BrowserRouter>
      <CompleteCatalog />
    </BrowserRouter>
  )
}

export default App;
