// import SpaRoutes from 'routes/SpaRoutes';

import { BrowserRouter } from 'react-router-dom';
import LostProject from './pages/LostProject';



function App() {

  // return (<SpaRoutes />)

  return (
    <BrowserRouter>
      <LostProject />
    </BrowserRouter>
  )
}

export default App;
