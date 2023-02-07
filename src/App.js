import './App.css';
import CreateElection from './Components/Create Election/CreateElection';
import Elections from './Components/Elections/Elections';
import Footer from './Components/Footer/Footer';
import Login from './Components/Login/Login';
import Results from './Components/Results/Results';
import Registration from './Components/Registration/Registration';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Registration />,
  },
  {
    path: "/elections",
    element: <Elections />,
  },
  {
    path: "/createelection",
    element: <CreateElection />,
  },
  {
    path: "/results",
    element: <Results />,
  },
  
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <Footer />
    </div>
  );
}

export default App;
