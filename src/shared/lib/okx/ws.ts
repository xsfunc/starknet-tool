import { createEffect, createEvent, createStore, sample, split } from 'effector'
import type {
  Credentials,
  LoginProps,
  ReceivedMessage,
  SubscriptionArg,
  SubscriptionTopic,
} from './types'
import { getSignature } from './methods'

const connectCalled = createEvent()
const disconnected = createEvent<CloseEvent>()
const errorReceived = createEvent<Event>()
const connected = createEvent<Event>()
const loginCalled = createEvent<Credentials>()

const messageGot = createEvent<ReceivedMessage>()
const withdrawalMessageGot = createEvent<ReceivedMessage>()
const subscribed = createEvent<ReceivedMessage>()
const unsubscribed = createEvent<ReceivedMessage>()
const loggedIn = createEvent()

const sendCalled = createEvent<object>()
const subscribeCalled = sendCalled.prepend((args: SubscriptionArg[]) => ({ op: 'subscribe', args }))
const unsubscribeCalled = sendCalled.prepend((args: SubscriptionTopic[]) => ({ op: 'unsubscribe', args }))

const connectFx = createEffect(connect)
const sendMessageFx = createEffect(sendMessage)
const loginFx = createEffect(login)

const $connecting = connectFx.pending
const $socket = createStore<WebSocket | null>(null)

sample({
  clock: connectCalled,
  source: $socket,
  filter: socket => (socket && socket.readyState) !== 1,
  target: connectFx,
})
sample({
  clock: connectFx.doneData,
  target: $socket,
})

sample({
  clock: loginCalled,
  source: $socket,
  filter: socketNotNull,
  fn: (socket: WebSocket, credentials) => ({ socket, credentials }),
  target: loginFx,
})
sample({
  clock: sendCalled,
  source: $socket,
  filter: socketNotNull,
  fn: (socket: WebSocket, message) => ({ socket, message }),
  target: sendMessageFx,
})

split({
  source: messageGot,
  match: ({ event, arg }) => {
    if (event === 'subscribe')
      return 'subscribed'
    if (event === 'login')
      return 'loggedIn'
    if (event === 'unsubscribe')
      return 'unsubscribed'
    if (arg && arg.channel === 'withdrawal-info')
      return 'withdrawalMessageGot'
  },
  cases: {
    withdrawalMessageGot,
    unsubscribed,
    subscribed,
    loggedIn,
  },
})

export const ws = {
  connecting: $connecting,
  connect: connectCalled,
  send: sendCalled,
  subscribe: subscribeCalled,
  unsubscribe: unsubscribeCalled,
  login: loginCalled,

  connected,
  disconnected,
  messageGot,
  withdrawalMessageGot,
  errorReceived,
  unsubscribed,
  subscribed,
  loggedIn,
}

function sendMessage({ socket, message }: { socket: WebSocket; message: object }) {
  socket.send(JSON.stringify(message))
}

async function login({ socket, credentials }: LoginProps) {
  const { timestamp, signature } = await getSignature({
    customTimestamp: Date.now() / 1000,
    apiSecret: credentials.apiSecret,
    endpoint: '/users/self/verify',
    method: 'GET',
  })

  const message = {
    op: 'login',
    args: [
      {
        apiKey: credentials.apiKey,
        passphrase: credentials.apiPassphrase,
        sign: signature,
        timestamp,
      },
    ],
  }
  socket.send(JSON.stringify(message))
}

function connect() {
  const socket = new WebSocket('wss://ws.okx.com:8443/ws/v5/business')
  socket.onmessage = e => messageGot(JSON.parse(e.data) as ReceivedMessage)
  socket.onclose = disconnected
  socket.onerror = errorReceived
  socket.onopen = connected
  return socket
}

function socketNotNull(socket: WebSocket | null): socket is WebSocket {
  return socket !== null
}
