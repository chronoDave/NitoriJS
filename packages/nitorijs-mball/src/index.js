module.exports.info = {
  name: 'mball'
};

module.exports.run = (bot, config, message, args) => {
  const wisdom = [
    'It is certain',
    'It is decidedly so',
    'Without a doubt',
    'Yes definitely',
    'You may rely on it',
    'As I see it, yes',
    'Most likely',
    'Outlook good',
    'Yes',
    'Signs point to yes',
    'Reply hazy try again',
    'Ask again later',
    'Better not tell you now',
    '( ͡° ͜ʖ ͡°)',
    'Concentrate and ask again',
    "Don't count on it",
    'My reply is no',
    'My sources say no',
    'Outlook not so good',
    'Very doubtful'
  ];

  if (args.length === 0) return message.channel.send(`:8ball: \`${wisdom[14]}\``);
  return message.channel.send(
    `:8ball: \`${wisdom[Math.floor(Math.random() * wisdom.length)]}\``
  );
};
