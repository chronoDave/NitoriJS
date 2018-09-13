# NitoriJS
An open-source Discord bot written in JavaScript using the discord.js library.

NitoriJS is written in a modular fashion, so that adding extra functionality should be relatively simple.

To get an overview of NitoriJS' commands and functions, type `[prefix]help [component/plugin]`, or `[prefix]help [component/plugin] list` to get a full overview.

**Using the help command currently does not work for components!**
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
	"token": "", // Your Discord bot token
	"tokenClever": "", // Your CleverBot token (optional)
	"prefix": "", // Prefix for your commands
	"color": "", // Color used for embeds (Nitori's default color)
	"owner": "", // ID of the owner of the bot, usually yourself
}
```
After that, simply run the bot
```
node main.js
```
## Components / plugins
NitoriJS works on a component / plugin system. Components are necessary and cannot be removed, but can be added, whilst plugins can both be added and removed.
#### Adding plugins
For NitoriJS to detect plugins, all plugins must have a main .js file located in the plugins folder.
#### Creating plugins
For plugins, use the following template
```
// Metadata (gets used by the help component)
module.exports.info = {
	name: "", // Name of plugin
	description: "", // Small description of what it does
	args: "", // Arguments it takes
	examples: "", // Some examples
	list: "" // A full list of all arguments
};
// Event listener
// bot is the bot object, message is the message object, args are the arguments and Aletheia is the text modifier.
module.exports.run = async (bot, message, args, Aletheia) => {
    // Code
}
```
#### Using components
NitoriJS currently features 4 components:
- admin.js
-- Used in the main file (main.js) where things such as profile picture or status changes can be made. Status changes are made via presence.js. Best to keep this file alone.
- presence.js
-- Sets status of the bot, best to keep this file alone.
- help.js
-- Extracts plugin information, best to keep this file alone.
-  aletheia.js 
-- Enables / disables the use of "garbled" text similar to the [Zalgo Text Generator by Tchouky](http://www.eeemo.net/). This can be called inside your plugin using the `Aletheia.send()` function. Enabling / disabling of Aletheia is done inside the main file, located inside the Admin component.