import { combineReducers } from 'redux';

import { appendMessage } from './utils';

export const backend = (state, action) => {
  if (!state) {
    state = { ready: false, loading: false, error: null };
  }

  switch (action.type) {
    case 'BACKEND_SET_READY':
      return Object.assign({}, state, {
        ready: action.ready,
      });
    case 'BACKEND_SET_LOADING':
      return Object.assign({}, state, {
        loading: action.loading,
      });
    case 'BACKEND_SET_ERROR':
      return Object.assign({}, state, {
        error: action.error,
      });
    default:
      return state;
  }
};

export const currentChannel = (state = null, action) => {
  switch (action.type) {
    case 'SET_CURRENT_CHANNEL':
      return action.channel;
    default:
      return state;
  }
};

export const identities = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_IDENTITY':
      return Object.assign({}, state, {
        [action.id]: action.identity,
      });
    default:
      return state;
  }
};

export const channels = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_CHANNEL':
      return Object.assign({}, state, {
        [action.channel.id]: Object.assign({
          messageHashes: new Set(),
          messages: [],
        }, action.channel),
      });
    case 'APPEND_CHANNEL_MESSAGE':
      {
        const channel = state[action.id];
        if (!channel) {
          return state;
        }

        const message = action.message;

        // Duplicate
        if (channel.messageHashes.has(message.hash)) {
          return state;
        }

        const messageHashes = new Set(channel.messageHashes);
        messageHashes.add(message.hash);

        return Object.assign({}, state, {
          [action.id]: Object.assign({}, channel, {
            messageHashes,
            messages: appendMessage(channel.messages, action.message),
          }),
        });
      }
    case 'TRIM_CHANNEL_MESSAGES':
      {
        const channel = state[action.id];
        if (!channel) {
          return state;
        }

        return Object.assign({}, state, {
          [action.id]: Object.assign({}, channel, {
            messages: channel.messages.slice(-action.count),
          }),
        });
      }
    default:
      return state;
  }
};

export default combineReducers({
  backend,
  currentChannel,
  identities,
  channels,
});
