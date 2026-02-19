// import SpaRoutes from 'routes/SpaRoutes';

import { BrowserRouter } from 'react-router-dom';
import Sidebar from './components/ui/Sidebar';


function App() {

  // return (<SpaRoutes />)

  return (
    <BrowserRouter>
      <Sidebar />
    </BrowserRouter>
  )
}

export default App;
