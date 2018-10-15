# Socket Spike

# Components

## `SocketProvider`

 To be used once at the top level of the app similar to Redux Provider
 ex:

```jsx
 <SocketProvider wsUrl='ws:0.0.0.0:4000/socket', options={{token: '<token>'}}>
   <App />
 </SocketProvider>
 ```
## `SocketChannel`

The `SocketChannel` is rendered inside of your components to respond to and send messages over the specified channel.

 1 - Used as a self-closing component to respond to messages, doesnt affect markup
 ex:
```js
 render() {
   // .. jsx ...
   <SocketChannel
     channel='myChannel'
     onMessage={this.handleBroadcast}
    />
   // ... more jsx ...
 }
```
 the onMessage callback is invoked with `{ event: 'eventName', payload: {foo: 'bar'} }` when any message is broadcast over the specified channel. Call `setState` or dispatch an action to redux here.

 2 - Used to broadcast messages to the channel.
 All children are injected with channel prop
 ex:
 ```jsx
 render() {
   // ... jsx ...
   <SocketChannel
     channel='myChannel'
     onMessage={this.handleBroadcast}
    >
     <MyButton />
   <SocketChannel />
   // ... more jsx ...
 }

 const MyButton = ({ channel }) => (
   <button onClick={() => channel.push('some_message', 'some_payload')} />
 )
```
