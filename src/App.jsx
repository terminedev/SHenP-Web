// import SpaRoutes from 'routes/SpaRoutes';

import { BrowserRouter } from "react-router-dom";
import ListCategories from "./components/categories/ListCategories";
import { getProjectsByCatalog } from 'utils/firebase/obtainings.js';

function App() {

  return (
    <BrowserRouter>
      <ListCategories category={{ nameCategory: 'juego' }} allowFiltering={true} asynchronousFunction={async () => getProjectsByCatalog('juego')} />
    </BrowserRouter>
  );

  // return (<SpaRoutes />);
}

export default App;
