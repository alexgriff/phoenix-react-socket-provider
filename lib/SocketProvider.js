import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Socket } from 'phoenix'

import SocketContext from './SocketContext'

class SocketProvider extends Component {
  constructor(props) {
    super(props)
    const options = props.options || {}

    this.socket = new Socket(props.wsUrl, {
      params: options
    })
  }

  componentWillMount() {
    this.socket.connect()
  }

   render() {
     return (
       <SocketContext.Provider value={this.socket}>
         { this.props.children }
       </SocketContext.Provider>
     )
   }
 }

SocketProvider.defaultProps = {
 options: {}
}

SocketProvider.propTypes = {
  wsUrl: PropTypes.string.isRequired,
  options: PropTypes.object.isRequired,
}

export default SocketProvider
