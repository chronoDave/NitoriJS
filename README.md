# NitoriJS

A modular Discord bot

## Getting started
#### Download
<b>Full package: </b>
Clone or download the repository in your favorite Git application.

<b>Minimal package: </b>
Clone or download the `nitorijs-core` folder inside `packages`.

#### Config
- Create an `index.js` file inside `config` folder. This folder can be found inside `nitorijs-core` if you downloaded the full package.
- Add your Discord bot token.

#### Run
Yarn

```
yarn
yarn start
```

Npm

```
npm install
npm run start
```

## Adding plugins
NitoriJS is written in a modular fashion, allowing you to customize NitoriJS to your liking.

Add the following line to your `package.json` `dependencies` inside `nitorijs-core`:
- For internal packages (full package only):
	- `<package-name>: "./packages/<package-folder-name>"`
	- Example: `@nitorijs/admin: "./packages/nitorijs-admin"`
- For external packages:
	- `<package-name>: "git://github.com/<user>/<repo>.git"`
	- Example: `@nitorijs/admin: "git://github.com/chronoDave/NitoriJS/packages/nitorijs-admin.git"`

Require the imported file inside your config file:
```
const admin = require('@nitorijs/admin');

module.exports = {
	...
    add: async Nitori => {
    	try {
        	Nitori.set(admin.info, admin.run)
        } catch (err) {
        	console.error(err);
        }
    }
}
```

## Creating plugins
NitoriJS plugins only require two things:
- An info export with a `name` property
- A run export

NitoriJS exposes the client (the bot, NitoriJS), message and args function on the run export.

```
module.exports.info = {
	name: 'admin'
}

module.exports.run = (bot, message, args) => {
	// Do code stuff
    // message.reply(args)
}
```

## License

This project is licensed under the [Gnu General Public License](https://github.com/chronoDave/Doombox/blob/master/LICENSE).
