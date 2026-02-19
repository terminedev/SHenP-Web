// import SpaRoutes from 'routes/SpaRoutes';

import { BrowserRouter } from 'react-router-dom';
import Load from './components/ui/Load';


function App() {

  // return (<SpaRoutes />)

  return (
    <BrowserRouter>
      <Load />
    </BrowserRouter>
  )
}

export default App;
