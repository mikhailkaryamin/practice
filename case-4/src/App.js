import React from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import { AuthProvider } from './services/Auth'
import Login from './components/Login/Login';
import Users from './components/Users/Users';

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/users" component={Users} />
            <Route path="/" component={Dashboard} />
            <Redirect exact from="/" to="/users" />
          </Switch>

        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
