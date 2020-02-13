module.exports = {
  disableEveryone: process.env.DISABLE_EVERYONE || true,
  token: process.env.TOKEN,
  prefix: '$',
  owner: process.env.OWNER,
  clever: {
    token: process.env.CLEVER_TOKEN
  }
};
