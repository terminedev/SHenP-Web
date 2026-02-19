// import SpaRoutes from 'routes/SpaRoutes';

import ListCategories from 'components/categories/ListCategories';
import { BrowserRouter } from 'react-router-dom';
import { getProjectsByLimitedCategory } from 'utils/firebase/obtainings';

function App() {

  // return (<SpaRoutes />)

  return (
    <BrowserRouter>
      <ListCategories
        category={{ nameCategory: 'serie' }}
        allowFiltering={false}
        asynchronousFunction={async () => getProjectsByLimitedCategory('serie', 4)}
      />
    </BrowserRouter>
  )
}

export default App;
