// import SpaRoutes from 'routes/SpaRoutes';

import { BrowserRouter } from 'react-router-dom';
import NoResults from 'components/ui/NoResults';


function App() {

  // return (<SpaRoutes />)

  return (
    <BrowserRouter>
      <NoResults />
    </BrowserRouter>
  )
}

export default App;
