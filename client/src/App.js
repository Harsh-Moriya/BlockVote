import React from 'react';
import CreateElection from './Components/Create Election/CreateElection';
import Elections from './Components/Elections/Elections';
import Footer from './Components/Footer/Footer';
import Login from './Components/Login/Login';
import Results from './Components/Results/Results';
import Registration from './Components/Registration/Registration';
import ElectionStates from './Context/Election Context/ElectionStates';
import AlertStates from './Context/Alert Context/AlertStates';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import UserStates from './Context/UserContext/UserStates';
import VotingStates from './Context/Voting Context/VotingStates';
import ErrorBoundary from './Components/Error/ErrorBoundary';

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
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/createelection",
    element: <CreateElection />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/results",
    element: <Results />,
    errorElement: <ErrorBoundary />,
  },

]);

function App() {


  return (
    <div className="App">
      <VotingStates>
        <UserStates>
          <ElectionStates>
            <AlertStates>
              <RouterProvider router={router} />
              <Footer />
            </AlertStates>
          </ElectionStates>
        </UserStates>
      </VotingStates>
    </div>
  );
}

export default App;
