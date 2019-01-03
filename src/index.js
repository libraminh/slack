import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import registerServiceWorker from './registerServiceWorker';
import firebase from './firebase'
import rootReducer from './reducers/index'
import 'semantic-ui-css/semantic.min.css'
import Spinner from './Spinner'

import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'

import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import { setUser } from './actions/index'

const store = createStore(rootReducer, composeWithDevTools())

class Root extends React.Component {
  componentDidMount() {
    const { setUser, isLoading } = this.props
    console.log(isLoading)
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        setUser(user)
        this.props.history.push('/')
      }
    })
  }

  render() {
    return this.props.isLoading ? <Spinner /> : (
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.user.isLoading
  }
}

const RootWithAuth = withRouter(connect(mapStateToProps, {setUser})(Root))

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <RootWithAuth />
    </Router>
  </Provider>
, document.getElementById('root'));
registerServiceWorker();
