const TYPE = {
  PERMISSION: {
    MINIMAL: [
      'READ_MESSAGES',
      'SEND_MESSAGES',
      'VIEW_CHANNEL'
    ],
    BASIC: [
      'READ_MESSAGES',
      'EMBED_LINKS',
      'USE_EXTERNAL_EMOJIS',
      'SEND_MESSAGES',
      'ATTACH_FILES',
      'ADD_REACTIONS',
      'VIEW_CHANNEL',
      'CONNECT',
      'SPEAK'
    ],
    FULL: ['ADMINISTRATOR']
  },
  COLLECTION: {
    GUILD: 'guild'
  },
  PLUGIN: {
    ADMIN: 'admin'
  },
  ACTION: {
    INFO: 'info',
    AVATAR: 'avatar',
    USERNAME: 'username',
    STATUS: 'status',
    GUILD: 'guild',
    PREFIX: 'prefix',
    LEAVE: 'leave'
  },
  ACTIVITY: {
    PLAYING: 'PLAYING',
    STREAMING: 'STREAMING',
    LISTENING: 'LISTENING',
    WATCHING: 'WATCHING'
  }
};

const STATUS = [{
  type: TYPE.ACTIVITY.LISTENING,
  status: 'Steins;Gate Symphonic Reunion'
}, {
  type: TYPE.ACTIVITY.LISTENING,
  status: 'Steins;Gate Original Soundtrack'
}, {
  type: TYPE.ACTIVITY.LISTENING,
  status: 'Kurisu talking shit'
}, {
  type: TYPE.ACTIVITY.LISTENING,
  status: 'Kurisu being an idiot'
}, {
  type: TYPE.ACTIVITY.LISTENING,
  status: 'Kurisu failing her experiments'
}, {
  type: TYPE.ACTIVITY.LISTENING,
  status: 'Fayris making weird noises...?'
}, {
  type: TYPE.ACTIVITY.LISTENING,
  status: 'Okabe making a fool of himself'
}, {
  type: TYPE.ACTIVITY.LISTENING,
  status: 'Okabe making a fool of himself, yet again'
}, {
  type: TYPE.ACTIVITY.LISTENING,
  status: 'Amadeus\' singing...?'
}, {
  type: TYPE.ACTIVITY.LISTENING,
  status: 'Amadeus being an idiot'
}, {
  type: TYPE.ACTIVITY.LISTENING,
  status: 'Salieri arguing with Amadeus'
}, {
  type: TYPE.ACTIVITY.PLAYING,
  status: 'with timelines'
}, {
  type: TYPE.ACTIVITY.PLAYING,
  status: 'with Amadeus'
}, {
  type: TYPE.ACTIVITY.PLAYING,
  status: 'with Salieri'
}, {
  type: TYPE.ACTIVITY.PLAYING,
  status: 'with time machines'
}];

const REPLY = {
  GENERAL: {
    NO_INPUT: 'I\'m sorry, what?'
  },
  ADMIN: {
    INVALID: 'And who do you think you are?'
  },
  AVATAR: {
    SUCCESS: 'D-do you like my new picture?',
    NO_INPUT: 'What image do you have in mind?',
    ERROR: 'I don\'t feel like changing my appearance right now...'
  },
  NAME: {
    SUCCESS: name => `From now on, I want you to call me ${name}!`,
    NO_INPUT: 'What image do you have in mind?',
    ERROR: 'I don\'t feel like changing my name right now...'
  },
  GUILD: {
    INVALID: 'I\'m sorry, but I\'m not part of that server',
    INFO: 'Here\'s what I\' gathered',
    LIST: 'These are all the guilds I\'m part of'
  },
  PREFIX: {
    NO_INPUT: 'What prefix do you want to use?',
    SUCCESS: prefix => `Prefix set to: \`${prefix}\``
  },
  LEAVE: {
    SUCCESS: name => `Well, that's it then, I've left ${name}`,
    ERROR: 'Aaaa! I couldn\'t leave the server! How frustrating!'
  },
  STATUS: {
    SUCCESS: (verb, activity) => `Alright, I'll be ${verb} ${activity}!`,
    ERROR: 'How about no'
  }
};

module.exports = {
  TYPE,
  STATUS,
  REPLY
};
