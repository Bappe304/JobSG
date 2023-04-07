import './index.css';
import NavBar from './NavBar';
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom'
import Home from './Home'


function App() {
  return (
    <Router>
      <div className="App">
        <NavBar/>
          <Switch>
          <Route exact path ="/">
            <Home />
          </Route>
          <Route path ="/jobListing/:id">

          </Route>
          </Switch>
      </div>
    </Router>
    
  );
}

export default App;
