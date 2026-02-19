// import SpaRoutes from 'routes/SpaRoutes';

import { BrowserRouter } from 'react-router-dom';
import Layout from 'components/ui/Layout';


function App() {

  // return (<SpaRoutes />)

  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}

export default App;
