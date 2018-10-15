import React, { Component } from 'react'
import PropTypes from 'prop-types'

import SocketContext from './SocketContext'

class SocketChannel extends Component {
  constructor() {
    super()
    this.channel = null
  }

  render() {
    const { channel, onMessage, children } = this.props

    return (
      <SocketContext.Consumer>
        {
          connection => {
            if (!this.channel) {
              this.channel = connection.channel(channel, {client: 'browser'})

              connection.onMessage(({ event, topic, payload }) => {
                if (topic === channel) {
                  onMessage({ event, payload })
                }
              })

              this.channel.join()
              .receive("ok", ({messages}) =>  console.log('successfully joined channel', messages || '') )
              .receive("error", ({reason}) => console.error('failed to join channel', reason) )
            }

            /* Inject any child components with the channel as a prop */
            /* This will allow the component to broadcast messages */
            /* ex: `this.props.channel.push('event_name', payload)` */
            return React.Children.map(
              children,
              child => React.cloneElement(child, { channel: this.channel })
            )
          }
        }
      </SocketContext.Consumer>
    )
  }
}

SocketChannel.propTypes = {
  channel: PropTypes.string.isRequired,
  onMessage: PropTypes.func.isRequired,
}

export default SocketChannel
