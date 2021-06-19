import Movies from './components/Movies'
import Navbar from './components/Navbar';
import {Route, Switch, Redirect} from 'react-router-dom'
import Customers from './pages/Customers.jsx'
import Rentals from './pages/Rentals.jsx'
import NotFound from './pages/NotFound.jsx'
import MovieForm from './pages/MovieForm.jsx'
import LoginForm from './pages/LoginForm.jsx'
import Register from './pages/Register';
import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <main className="container mt-3">
        <Switch>
          <Route path ="/movies/:id" component={MovieForm}/>
          <Route path ="/movies/new" component={MovieForm}/>
          <Route path ="/login" component={LoginForm}/>
          <Route path ="/register" component={Register}/>
          <Route path ="/rentals" component={Rentals}/>
          <Route path ="/customers" component={Customers}/>
          <Route path ="/not-found" component={NotFound}/>
          <Route path ="/movies"  component={Movies}/>
          <Redirect from="/" exact to ="/movies"/>
          <Redirect to="/not-found"/>
        </Switch>
      </main>
      </>
    
  );
}
  


export default App;
