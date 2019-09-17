import {
  invite, acceptInvite, displayHelp, displayFeedURL, renameIdentityPair,
  displayPeerID,
} from './actions';

export default new Map([
  [
    'help',
    { args: [ ], action: displayHelp },
  ],
  [
    'invite',
    { args: [ 'inviteeName', 'request' ], action: invite },
  ],
  [
    'accept-invite',
    { args: [ 'requestId', 'box' ], action: acceptInvite },
  ],
  [
    'get-feed-url',
    { args: [ ], action: displayFeedURL },
  ],
  [
    'rename',
    { args: [ 'newName' ], action: renameIdentityPair },
  ],
  [
    'get-peer-id',
    { args: [ ], action: displayPeerID },
  ],
]);

