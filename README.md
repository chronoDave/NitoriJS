# NitoriJS
An open-source Discord bot written in JavaScript using the discord.js library.

NitoriJS is written in a modular fashion, so that adding extra functionality should be relatively simple.

To get an overview of NitoriJS' commands and functions, type `[prefix]help [component/plugin]`, or `[prefix]help [component/plugin] list` to get a full overview.
## Getting Started
As NitoriJS runs on node, you'll need both node.js and npm to get started.
```
download / clone repo
npm install
```
Before running NitoriJS, create a settings.json file inside the components folder
```
// settings.json
{
	"token": '', // Your Discord bot token
	"tokenClever": '', // Your CleverBot token (optional)
	"prefix": '', // Prefix for your commands
	"color": '', // Color used for embeds (Nitori's default color)
	"owner": '', // ID of the owner of the bot, usually yourself
}
```
After that, simply run the bot
```
node main.js
```
## Components / plugins
NitoriJS works on a component / plugin system. Components are neccesary and cannot be removed, but can be added, whilst plugins can both be added and removed.
#### Adding plugins
For NitoriJS to detect plugins, all plugins must have a main .js file located in the plugins folder.
#### Creating plugins
For plugins, use the following template
```
// Metadata (gets used by the help component)
module.exports.info = {
	name: '', // Name of plugin
	description: '', // Small description of what it does
	args: '', // Arguments it takes
	examples: '', // Some examples
	list: '' // A full list of all arguments
};
// Event listener
module.exports.run = async (bot, message, args) => {
    // Code
}
```