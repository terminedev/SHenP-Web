// import SpaRoutes from 'routes/SpaRoutes';

import { BrowserRouter } from "react-router-dom";
import Sidebar from "./components/ui/Sidebar";

function App() {

  return (
    <BrowserRouter>
      <Sidebar />
    </BrowserRouter>
  );

  // return (<SpaRoutes />);
}

export default App;
