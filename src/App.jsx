// import SpaRoutes from 'routes/SpaRoutes';

import { BrowserRouter } from "react-router-dom";
import Load from "./components/ui/Load";

function App() {

  return (
    <BrowserRouter>
      <Load />
    </BrowserRouter>
  );

  // return (<SpaRoutes />);
}

export default App;
