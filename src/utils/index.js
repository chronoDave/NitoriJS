const markup = {
  block: text => `\`\`\`${text}\`\`\``,
  code: text => `\`${text}\``
};

const getMembers = (input, event) => Promise.all(input
  .map(text => new Promise(resolve => {
    if (!text.includes('<@')) return resolve(text);
    const userId = text.match(/(\d+)/g)[0];
    return event.guild.fetchMember(userId)
      .then(member => resolve(member.nickname || member.user.username))
      .catch(err => {
        console.error(err);
        return resolve('???');
      });
  })));

const getRandomMinMax = (min, max) => Math.round(Math.random() * (max - min) + min);

module.exports = {
  markup,
  getMembers,
  getRandomMinMax
};
