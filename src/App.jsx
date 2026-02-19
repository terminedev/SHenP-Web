// import SpaRoutes from 'routes/SpaRoutes';

import ListCategories from 'components/categories/ListCategories';
import { BrowserRouter } from 'react-router-dom';
import { getProjectsByCatalog } from 'utils/firebase/obtainings';

function App() {

  // return (<SpaRoutes />)

  return (
    <BrowserRouter>
      <ListCategories
        category={{ nameCategory: 'serie' }}
        allowFiltering={true}
        asynchronousFunction={async () => getProjectsByCatalog('serie')}
      />
    </BrowserRouter>
  )
}

export default App;
