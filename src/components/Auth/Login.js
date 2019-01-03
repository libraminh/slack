import React, { Component } from 'react'
import { Grid, Form, Segment, Button, Header, Message, Icon} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import firebase from './../../firebase'

export class Login extends Component {
  state = {
    email: '',
    password: '',
    passwordConfirmation: '',
    errors: [],
    loading: false,
  }

  handleChange = e => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  displayErrors = errors => errors.map((error, i) => <p key={i}>{error.message}</p>)

  handleSubmit = e => {
    e.preventDefault()
    if(this.isFormValid(this.state)) {
      this.setState({
        errors: [],
        loading: true
      })
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(signedInUser => {
          console.log(signedInUser)
        })
        .catch(err => {
          console.log(err)
          this.setState({
            errors: this.state.errors.concat(err),
            loading: false
          })
        })
    }
  }

  isFormValid = ({email, password}) => email && password

  handleInputError = (errors, inputName) => {
    return errors.some(error => error.message.toLowerCase().includes(inputName)) ? 'error' : ''
  }

  render() {
    const { email, password, errors, loading } = this.state

    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h1" icon color="violet" textAlign="center">
            <Icon name="puzzle branch" color="violet" />
            Login to devchat
          </Header>
          <Form onSubmit={this.handleSubmit} size="large">
            <Segment stacked>
              <Form.Input fluid value={email} name="email" icon="mail" iconPosition="left" placeholder="Email Address" onChange={this.handleChange}
                className={this.handleInputError(errors, 'email')} type="email" />
              <Form.Input className={this.handleInputError(errors, 'password')} fluid value={password} name="password" icon="lock" iconPosition="left" placeholder="Password" onChange={this.handleChange} type="password" />

              <Button disabled={loading} className={loading ? 'loading' : ''} color="violet" fluid size="large">Submit</Button>
            </Segment>
            <Message>Don't have an account? <Link to="/register">Register</Link></Message>
          </Form>
          {errors.length > 0 && (
            <Message error>
              <h3>Error</h3>
              {this.displayErrors(errors)}
            </Message>
          )}
        </Grid.Column>
      </Grid>
    )
  }
}

export default Login
