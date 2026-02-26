// import SpaRoutes from 'routes/SpaRoutes';

import { BrowserRouter } from "react-router-dom";
import NoResults from "./components/ui/NoResults";

function App() {

  return (
    <BrowserRouter>
      <NoResults />
    </BrowserRouter>
  );

  // return (<SpaRoutes />);
}

export default App;
