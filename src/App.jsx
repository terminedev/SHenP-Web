// import SpaRoutes from 'routes/SpaRoutes';

import { BrowserRouter } from "react-router-dom";
import AdvancedSearch from "./components/ui/AdvancedSearch";

function App() {

  return (
    <BrowserRouter>
      <AdvancedSearch onClose={() => { }} />
    </BrowserRouter>
  );

  // return (<SpaRoutes />);
}

export default App;
