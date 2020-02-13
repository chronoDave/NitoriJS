const MODIFIERS = [
  '\u030d',
  '\u030e',
  '\u0304',
  '\u0305',
  '\u033f',
  '\u0311',
  '\u0306',
  '\u0310',
  '\u0352',
  '\u0357',
  '\u0351',
  '\u0307',
  '\u0308',
  '\u030a',
  '\u0342',
  '\u0343',
  '\u0344',
  '\u034a',
  '\u034b',
  '\u034c',
  '\u0303',
  '\u0302',
  '\u030c',
  '\u0350',
  '\u0300',
  '\u0301',
  '\u030b',
  '\u030f',
  '\u0312',
  '\u0313',
  '\u0314',
  '\u033d',
  '\u0309',
  '\u0363',
  '\u0364',
  '\u0365',
  '\u0366',
  '\u0367',
  '\u0368',
  '\u0369',
  '\u036a',
  '\u036b',
  '\u036c',
  '\u036d',
  '\u036e',
  '\u036f',
  '\u033e',
  '\u035b',
  '\u0346',
  '\u031a',
  '\u0316',
  '\u0317',
  '\u0318',
  '\u0319',
  '\u031c',
  '\u031d',
  '\u031e',
  '\u031f',
  '\u0320',
  '\u0324',
  '\u0325',
  '\u0326',
  '\u0329',
  '\u032a',
  '\u032b',
  '\u032c',
  '\u032d',
  '\u032e',
  '\u032f',
  '\u0330',
  '\u0331',
  '\u0332',
  '\u0333',
  '\u0339',
  '\u033a',
  '\u033b',
  '\u033c',
  '\u0345',
  '\u0347',
  '\u0348',
  '\u0349',
  '\u034d',
  '\u034e',
  '\u0353',
  '\u0354',
  '\u0355',
  '\u0356',
  '\u0359',
  '\u035a',
  '\u0323',
  '\u0315',
  '\u031b',
  '\u0340',
  '\u0341',
  '\u0358',
  '\u0321',
  '\u0322',
  '\u0327',
  '\u0328',
  '\u0334',
  '\u0335',
  '\u0336',
  '\u034f',
  '\u035c',
  '\u035d',
  '\u035e',
  '\u035f',
  '\u0360',
  '\u0362',
  '\u0338',
  '\u0337',
  '\u0361',
  '\u0489'
];

const TYPE = {
  URL: {
    CLEVER: ({ token, input, session }) => `https://www.cleverbot.com/getreply?key=${token}&input=${input}&cs=${session}`
  },
  COLOR: {
    TEAL: '#1abc9c',
    GREEN: '#2ecc71',
    BLUE: '#3498db',
    PURPLE: '#9b59db',
    PINK: '#e91e63',
    YELLOW: '#f1c40f',
    ORANGE: '#e67e22',
    RED: '#e74c3c',
    GRAY: '#95a5a6',
    WHITE: '#eff6f7',
    BLACK: '#1e2223'
  },
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
    ADMIN: 'admin',
    MBALL: 'mball',
    HELP: 'help',
    DROLL: 'roll'
  },
  ACTION: {
    LIST: 'list',
    INFO: 'info',
    AVATAR: 'avatar',
    USERNAME: 'username',
    STATUS: 'status',
    GUILD: 'guild',
    PREFIX: 'prefix',
    LEAVE: 'leave',
    TRUTH: 'truth'
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
  DESCRIPTION: {
    HELP: 'Maho\'s help plugin',
    ADMIN: 'These are my personal settings, leave me alone!',
    MBALL: '8-ball plugin, inspired by Zach\'s text adventures',
    DROLL: 'Roll dice using common dice notation: https://en.wikipedia.org/wiki/Dice_notation'
  },
  GENERAL: {
    NO_INPUT: 'I\'m sorry, what?',
    PREFIX: prefix => `I'm using the prefix \`${prefix}\` for this server`
  },
  HELP: {
    LIST: (plugins, help) => `These are the plugins I have loaded: ${plugins}\nType ${help} for more information about that plugin`,
    INVALID: help => `I'm sorry, I don't have that plugin available. For a list of plugins, type ${help}`,
    PLUGIN: (description, plugin) => `**${description}**\nList of all possible commands for the plugin ${plugin}:`
  },
  ADMIN: {
    INVALID: 'And who do you think you are?'
  },
  DROLL: {
    NO_INPUT: 'How many dice do you wish to roll?',
    INVALID: 'Please use the common dice notation: https://en.wikipedia.org/wiki/Dice_notation',
    INVALID_NUM: 'I can\'t roll that many dice!'
  },
  TRUTH: bool => `Truth ${bool ? 'enabled' : 'disabled'}`,
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
  MODIFIERS,
  TYPE,
  STATUS,
  REPLY
};
