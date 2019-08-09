const nameRouter = async (bot, message, args) => {
  let response;

  if (args.length === 0) {
    response = 'What name do you have in mind?';
  } else {
    const username = args.join(' ');
    try {
      bot.user.setUsername(username);
      response = `I have renamed myself to ${username}!`;
    } catch (err) {
      console.log(err);
      response = 'I don\'t feel like changing my name right now...';
    }
  }

  message.reply(response);
};

module.exports = {
  nameRouter
};
