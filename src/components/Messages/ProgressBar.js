import React, { Component } from 'react'
import { Progress } from 'semantic-ui-react'

export class ProgressBar extends Component {
  render() {
    const { uploadState, percentUploaded } = this.props
    return (
      uploadState === 'uploading' && (
        <Progress
          className="progress__bar"
          percent={percentUploaded}
          progress
          indicating
          size="medium"
          inverted
        />
      )
    )
  }
}

export default ProgressBar