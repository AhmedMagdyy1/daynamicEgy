import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Layout from './Components/Layout/Layout';
import Users from './Components/Users/Users';
import Register from './Components/Register/Register';
import SignIn from './Components/SignIn/SignIn';
import UserContextProvider from './Components/Context/UserContext';


function App() {
  const routes = createBrowserRouter([
    {path:'',element:
      <Layout/>,children:[
      {index:true,element:<Register/>},
      {path:'register',element:<Register/>},
      {path:'login',element:<SignIn/>},
      {path:'users',element:<Users/>},
    ]},
  ])
  return (
    // to provide the app with the user info
    <UserContextProvider>
      <RouterProvider router={routes}/>
    </UserContextProvider>
  );
}

export default App;
