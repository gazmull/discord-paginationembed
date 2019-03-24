# Discord.JS - PaginationEmbed
A pagination utility for MessageEmbed in Discord.JS

[![Travis (.org) branch](https://img.shields.io/travis/gazmull/discord-paginationembed/master.svg?logo=travis&style=for-the-badge)](https://travis-ci.org/gazmull/discord-paginationembed)

## 📣 Notice Board
- [**Changelog**](CHANGELOG.md)
- [**Updating from `v0.8.0` to `v1.0.0`**](UPDATING_V1.md)

## 🎉 Welcome
- ✔ **Typings** included
- ✔ [**Documentation**](https://gazmull.github.io/discord-paginationembed "Go to My Documentation") for online references
- ✔ Supports [**Discord.JS v12 (current master)**](https://discord.js.org/#/docs/main/master/general/welcome "Go to Discord.JS Master Documentation")
- ❌ Currently does not support **Discord.JS v11 (current stable)**
- ❔ Nothing found within docs or need a nudge? You may visit the [**Discord server**](https://discord.gg/eDUzT87)

## 🛠 Installation
- **PaginationEmbed**: `npm install discord-paginationembed`
- **Discord.JS**: `npm install discordjs/discord.js`
    - ❗ Requires [**Git**](https://git-scm.com/)

## 🔰 Examples

### In-action samples:
- [**Pages of command description**](https://github.com/gazmull/eros-bot/blob/master/src/commands/general/guide.ts#L35)
- [**Toggle between character and its weapon, and toggle image visibility**](https://github.com/gazmull/eros-bot/blob/master/src/commands/kamihime/info.ts#L180)
- [**EXP Leaderboard**](https://github.com/gazmull/eros-bot/blob/master/src/commands/level/leaderboard.ts#L23)
- [**Music Queue**](https://github.com/gazmull/ramiel-bot/blob/master/src/commands/music/queue.ts#L33)

<br><br>
> ### Under `message` event

### FieldsEmbed Mode
```js
const { FieldsEmbed: FieldsEmbedMode } = require('discord-paginationembed');

const FieldsEmbedModeInstance = new FieldsEmbedMode()
  .setArray([ { word: 'they are' }, { word: 'being treated' } ])
  .setAuthorizedUsers([message.author.id])
  .setChannel(message.channel)
  .setElementsPerPage(2)
  .setPage(2)
  .showPageIndicator(false)
  .formatField('Continue...', el => el.word);

// Customise the Embed
FieldsEmbedModeInstance.embed
  .setColor(0x00FFFF)
  .setTitle('Jesus Yamato Saves the Day by Obliterating a Swarm of Abyssal Bombers!')
  .setDescription('Akagi and Kaga give their thanks to their holy saviour today as...')
  .setImage('https://lh5.googleusercontent.com/-TIcwCxc7a-A/AAAAAAAAAAI/AAAAAAAAAAA/Hij7_7Qa1j0/s900-c-k-no/photo.jpg');

embed.build();
```
![FieldsEmbed](https://github.com/gazmull/discord-paginationembed/blob/master/demo/FieldsEmbed.gif?raw=true)

### Embeds Mode
```js
const { Embeds: EmbedsMode } = require('discord-paginationembed');
const { MessageEmbed } = require('discord.js');

const embeds = [];

for (let i = 0; i < 5; ++i)
  embeds.push(new MessageEmbed().addField('Page', i + 1));

const myImage = message.author.displayAvatarURL();

new EmbedsMode()
  .setArray(embeds)
  .setAuthorizedUsers([message.author.id])
  .setChannel(message.channel)
  .showPageIndicator(true)
  .setPage(3)
  .setImage(myImage) // Methods here and below are for customising all embeds
  .setThumbnail(myImage)
  .setTitle('Test Title')
  .setDescription('Test Description')
  .setFooter('Test Footer Text')
  .setURL(myImage)
  .setColor(0xFF00AE)
  .addBlankField()
  .addField('Test Field 1', 'Test Field 1', true)
  .addField('Test Field 2', 'Test Field 2', true)
  .build();
```
![Embeds](https://github.com/gazmull/discord-paginationembed/blob/master/demo/Embeds.gif?raw=true)

## 💡🐛💻 Contributing
### Bug Reports
Please provide reproducible steps and results proofs (e.g: images). Also, solutions are welcome!

### Suggestions / Discussions
Please be explicit about the feature's description and provide a valid reason (e.g: beneficial to users or development time) why it should be added/changed/removed.

### Source Code
- Fork this repository.
- Execute `npm install`
- Code and code and code and code and... code!
  - To enable [**incremental compilation**](https://en.wikipedia.org/wiki/Incremental_compiler) to JS: `npm run dev:watch`
- `npm test` to verify if your additions/adjustments are following the project's codebase rules and to verify if the docs are valid.
- Please make sure that you have tested your changes very well.
    - There is a test bot script under `test` folder. To get started:
        - Copy `credentials.sample.js` to `credentials.js` and fill up your private credentials (token, test channel, etc)
        - Execute either:
          - One-time test: `npm run test:bot`
          - Hot-reloading test (nodemon): `npm run dev:start`
- File a [**Pull Request (PR)**](https://github.com/gazmull/discord-paginationembed/compare)!
- For the PR comment, it goes the same with **`Suggestions / Discussions`**.

# License
> [**MIT**](LICENSE)

© 2018-present [**Euni (gazmull)**](https://github.com/gazmull)

