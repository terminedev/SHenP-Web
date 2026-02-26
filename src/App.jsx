// import SpaRoutes from 'routes/SpaRoutes';

import { BrowserRouter } from "react-router-dom";
import Layout from 'components/ui/Layout';

function App() {

  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );

  // return (<SpaRoutes />);
}

export default App;
