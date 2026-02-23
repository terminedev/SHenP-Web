// import SpaRoutes from 'routes/SpaRoutes';

import { BrowserRouter } from "react-router-dom";
import ListCategories from "./components/categories/ListCategories";
import { getProjectsByCatalog } from 'utils/firebase/obtainings.js';

function App() {

  return (
    <BrowserRouter>
      <ListCategories category={{ nameCategory: 'serie' }} allowFiltering={false} asynchronousFunction={async () => getProjectsByCatalog('serie')} />
    </BrowserRouter>
  );

  // return (<SpaRoutes />);
}

export default App;
