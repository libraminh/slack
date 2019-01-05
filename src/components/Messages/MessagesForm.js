import React, { Component } from 'react'
import { Segment, Button, Input } from 'semantic-ui-react'
import firebase from '../../firebase'
import uuidv4 from 'uuid/v4'
import ProgressBar from './ProgressBar'

import FileModal from './FileModal'

export class MessagesForm extends Component {
  state = {
    message: '',
    loading: false,
    channel: this.props.currentChannel,
    user: this.props.currentUser,
    errors: [],
    modal: false,
    uploadTask: null,
    uploadState: '',
    storageRef: firebase.storage().ref(),
    percentUploaded: 0
  }

  openModal = () => this.setState({ modal: true })

  closeModal = () => this.setState({ modal: false })

  handleChange = e => {
    this.setState({ [e.target.name] : e.target.value })
  }

  sendMessage = () => {
    const { messagesRef } = this.props
    const { message, channel } = this.state

    if(message) {
      this.setState({ loading: true })
      messagesRef
        .child(channel.id)
        .push()
        .set(this.createMessage())
        .then(() => {
          this.setState({ loading: false, message: '', erros: [] })
        })
        .catch(err => {
          console.error(err)
          this.setState({
            loading: false,
            errors: this.state.errors.concat(err)
          })
        })
    } else {
      this.setState({
        errors: this.state.errors.concat({ message: 'Add a message' })
      })
    }
  }

  createMessage = (fileUrl = null) => {
    const message = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: this.state.user.uid,
        name: this.state.user.displayName,
        avatar: this.state.user.photoURL
      }
    }
    if (fileUrl !== null) {
      message['image'] = fileUrl
    } else {
      message['content'] = this.state.message
    }
    return message
  }

  uploadFile = (file, metadata) => {
    const pathToUpload = this.state.channel.id
    const ref = this.props.messagesRef
    const filePath = `chat/public/${uuidv4()}.jpg`

    this.setState({
      uploadState: 'uploading',
      uploadTask: this.state.storageRef.child(filePath).put(file, metadata)
    }, () => {
      this.state.uploadTask.on('state_changed', snap => {
        const percentUploaded = Math.round((snap.bytesTransferred / snap.totalBytes) * 100)
        this.props.isProgressBarVisible(percentUploaded)
        this.setState({ percentUploaded })
      }, err => {
        console.error(err)
        this.setState({
          errors: this.state.errors.concat(err),
          uploadState: 'error',
          uploadTask: null
        })
      }, () => {
        this.state.uploadTask.snapshot.ref.getDownloadURL()
        .then(downloadUrl => {
          this.sendFileMessage(downloadUrl, ref, pathToUpload)
        })
        .catch(err => {
          console.error(err)
          this.setState({
            errors: this.state.errors.concat(err),
            uploadState: 'error',
            uploadTask: null
          })
        })
      })
    })
  }

  sendFileMessage = (fileUrl, ref, pathToUpload) => {
    ref.child(pathToUpload)
      .push()
      .set(this.createMessage(fileUrl))
      .then(() => {
        this.setState({ uploadState: 'done'})
      })
      .catch(err => {
        console.error(err)
        this.setState({
          errors: this.state.errors.concat(err)
        })
      })
  }

  render() {
    const { errors, message, loading, modal, uploadState, percentUploaded } = this.state

    return (
      <Segment className="message__form">
        <Input 
          fluid
          name="message"
          onChange={this.handleChange}
          value={message}
          style={{ marginBottom: '0.7em' }}
          label={<Button icon={'add'} />}
          labelPosition="left"
          className={
            errors.some(err => err.message.includes('message')) ? 'error' : ''
          }
          placeholder="Write your message"
        />
        <Button.Group icon widths="2">
        <Button
          onClick={this.sendMessage}
          disabled={loading}
          color="orange"
          content="Add Reply"
          labelPosition="left"
          icon="edit"
        />
        <Button
          color="teal"
          onClick={this.openModal}
          disabled={uploadState === 'uploading'}
          content="Upload Media"
          labelPosition="right"
          icon="cloud upload"
        />
        </Button.Group>
        <FileModal
          modal={modal}
          closeModal={this.closeModal}
          uploadFile={this.uploadFile}
        />
        <ProgressBar
          uploadState={uploadState}
          percentUploaded={percentUploaded}
        />
      </Segment>
    )
  }
}

export default MessagesForm