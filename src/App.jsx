// import SpaRoutes from 'routes/SpaRoutes';

import { BrowserRouter } from 'react-router-dom';
import AdvancedSearch from 'components/ui/AdvancedSearch';


function App() {

  // return (<SpaRoutes />)

  return (
    <BrowserRouter>
      <AdvancedSearch />
    </BrowserRouter>
  )
}

export default App;
