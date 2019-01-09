import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setCurrentChannel, setPrivateChannel } from '../../actions/index'
import { Menu, Icon } from 'semantic-ui-react'
import firebase from '../../firebase'


export class Starred extends Component {
  state = {
    activeChannel: '',
    starredChannels: [],
    user: this.props.currentUser,
    userRefs: firebase.database().ref('users')
  }

  componentDidMount() {
    if (this.state.user) {
      this.addListener(this.state.user.uid)
    }
  }

  componentWillUnmount() {
    this.removeListeners()
  }

  removeListeners = () => {
    this.state.userRefs.child(`${this.state.user.uid}/starred`).off()
  }

  addListener = userId => {
    this.state.userRefs
      .child(userId)
      .child('starred')
      .on('child_added', snap => {
        const starredChannels = { id: snap.key, ...snap.val() }
        this.setState({
          starredChannels: [...this.state.starredChannels, starredChannels]
        })
    })

    this.state.userRefs
      .child(userId)
      .child('starred')
      .on('child_removed', snap => {
        const channelToRemove = { id: snap.key, ...snap.val() }
        const filteredChannels = this.state.starredChannels.filter(channel => {
          return channel.id !== channelToRemove.id
        })
        this.setState({ starredChannels: filteredChannels })
    })
  }

  setActiveChannel = channel => {
    this.setState({ activeChannel: channel.id })
  }

  changeChannel = channel => {
    this.setActiveChannel(channel)
    this.props.setCurrentChannel(channel)
    this.props.setPrivateChannel(false)
  }

  displayChannels = starredChannels => {
    return (
      starredChannels.length > 0 && starredChannels.map(channel => (
        <Menu.Item
          key={channel.id}
          onClick={() => this.changeChannel(channel)}
          name={channel.name}
          style={{ opacity: 0.7 }}
          active={channel.id === this.state.activeChannel}
        >
          # {channel.name}
        </Menu.Item>
      ))
    )
  }

  render() {
    const { starredChannels } = this.state

    return (
      <Menu.Menu className="menu">
        <Menu.Item>
          <span>
            <Icon name="star" /> STARRED
          </span>{" "}
          ({ starredChannels.length})
        </Menu.Item>
        {this.displayChannels(starredChannels)}
      </Menu.Menu>
    )
  }
}

export default connect(null, {setPrivateChannel, setCurrentChannel})(Starred)
