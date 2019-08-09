const avatarRouter = async (bot, message, args) => {
  let response;

  if (args.length === 0) {
    response = 'What avatar do you have in mind?';
  } else {
    try {
      bot.user.setAvatar(args[0]);
      response = 'New avatar set!';
    } catch (err) {
      console.log(err);
      response = 'I don\'t feel like changing my looks right now...';
    }
  }

  message.reply(response);
};

module.exports = {
  avatarRouter
};
