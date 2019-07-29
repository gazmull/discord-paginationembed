# Discord.JS - PaginationEmbed
A pagination utility for RichEmbed in Discord.JS

[![Discord Server](https://discordapp.com/api/guilds/370614673122263041/embed.png)](https://discord.gg/eDUzT87)
[![Travis (.org) branch](https://img.shields.io/travis/gazmull/discord-paginationembed/master.svg?logo=travis&style=flat-square)](https://travis-ci.org/gazmull/discord-paginationembed)
[![npm peer dependency version](https://img.shields.io/npm/dependency-version/discord-paginationembed/peer/discord.js.svg?logo=npm&style=flat-square)](https://nodei.co/npm/discord-paginationembed/)
[![npm type definitions](https://img.shields.io/npm/types/discord-paginationembed.svg?logo=npm&style=flat-square)](https://nodei.co/npm/discord-paginationembed/)

[![NPM](https://nodei.co/npm/discord-paginationembed.png?downloads=true&stars=true)](https://nodei.co/npm/discord-paginationembed/)

## 📣 Notice Board
- [**Changelog**](https://github.com/gazmull/discord-paginationembed/blob/stable/CHANGELOG.md)
- [**Updating from `v0.7.7-v11` to `v1.0.0`**](https://github.com/gazmull/discord-paginationembed/blob/stable/UPDATING_V1.md) — Updated **2019-07-29**
- This utility now supports Discord.JS version **^11.5.1 (stable)**! For version **12 (master)** landing site, please see this branch instead: [**Click Me!**](https://github.com/gazmull/discord-paginationembed/tree/master)

## 🎉 Welcome
- ✔ **Typings** included
- ✔ [**Documentation**](https://gazmull.github.io/discord-paginationembed "Go to My Documentation") for online references
- ✔ **Asynchronous** workflow
- ✔ Supports [Discord.JS versions **12 (master)** and **^11.5.1 (stable)**](https://discord.js.org "Go to Discord.JS Documentation")
- ❔ Nothing found within docs or need a nudge? You may visit the [**Discord server**](https://discord.gg/eDUzT87)

## 🛠 Installation
- **PaginationEmbed**:
    - **For Discord.JS ^11.5.1 (stable)**: `npm install discord-paginationembed`
    - **For Discord.JS 12 (master)**:
      - **Published**: `npm install discord-paginationembed@beta`
      - **Unpublished**: `npm install gazmull/discord-paginationembed`
        - ❗ Requires [**Git**](https://git-scm.com/)
- **Discord.JS**:
    - **^11.5.1 (stable)**: `npm install discord.js`
    - **12 (master)**: `npm install discordjs/discord.js`
      - ❗ Requires [**Git**](https://git-scm.com/)

## 🔰 Examples
> [**Test Unit Example**](https://github.com/gazmull/discord-paginationembed/blob/stable/test)

> [**Preface for TypeScript Projects**](https://github.com/gazmull/discord-paginationembed/blob/stable/UPDATING_V1.md#TypeScript)

### In-action samples:
- [**Pages of command description**](https://github.com/gazmull/eros-bot/blob/master/src/commands/general/guide.ts#L35)
- [**Toggle between character and its weapon, and toggle image visibility**](https://github.com/gazmull/eros-bot/blob/master/src/commands/kamihime/info.ts#L180)
- [**EXP Leaderboard**](https://github.com/gazmull/eros-bot/blob/master/src/commands/level/leaderboard.ts#L23)
- [**Music Queue**](https://github.com/gazmull/ramiel-bot/blob/master/src/commands/music/queue.ts#L38)

<br><br>
> ### Import Node Module

```js
const Pagination = require('discord-paginationembed');
```

> ### Under `message` event

### `FieldsEmbed` Mode

```js
const FieldsEmbed = new Pagination.FieldsEmbed()
  // A must: an array to paginate, can be an array of any type
  .setArray([{ word: 'they are' }, { word: 'being treated' }])
  // Set users who can only interact with the instance, set as `[]` if everyone can interact.
  .setAuthorizedUsers([message.author.id])
   // A must: sets the channel where to send the embed
  .setChannel(message.channel)
  // Elements to show per page. Default: 10 elements per page
  .setElementsPerPage(2)
   // Have a page indicator (shown on message content)
  .setPageIndicator(false)
   // Format based on the array, in this case we're formatting the page based on each object's `word` property
  .formatField('Continue...', el => el.word);

// Customise embed
FieldsEmbed.embed
  .setColor(0x00FFFF)
  .setTitle('Jesus Yamato Saves the Day by Obliterating a Swarm of Abyssal Bombers!')
  .setDescription('Akagi and Kaga give their thanks to their holy saviour today as...')
  .setImage('https://lh5.googleusercontent.com/-TIcwCxc7a-A/AAAAAAAAAAI/AAAAAAAAAAA/Hij7_7Qa1j0/s900-c-k-no/photo.jpg');

// Deploy embed
FieldsEmbed.build();
```
![FieldsEmbed](https://github.com/gazmull/discord-paginationembed/blob/stable/demo/FieldsEmbed.png?raw=true)

#### Working with Asynchronous Behaviour
> This assumes this is under an `async` function

```js
const FieldsEmbed = new Pagination.FieldsEmbed()
  .setArray([{ name: 'John Doe' }, { name: 'Jane Doe' }])
  .setAuthorizedUsers([message.author.id])
  .setChannel(message.channel)
  .setElementsPerPage(1)
  // Initial page on deploy
  .setPage(2)
  .showPageIndicator(true)
  .formatField('Name', i => i.name)
  // Deletes the embed upon awaiting timeout
  .setDeleteOnTimeout(true)
  // Disable built-in navigation emojis, in this case: 🗑 (Delete Embed)
  .setDisabledNavigationEmojis(['DELETE'])
  // Set your own customised emojis
  .setFunctionEmojis({
    '🔄': (user, instance) => {
      const field = instance.embed.fields[0];

      if (field.name === 'Name')
        field.name = user.tag;
      else
        field.name = 'Name';
    }
  })
  // Similar to setFunctionEmojis() but this one takes only one emoji
  .addFunctionEmoji('🅱', (_, instance) => {
    const field = instance.embed.fields[0];

    if (field.name.includes('🅱'))
      field.name = 'Name';
    else
      field.name = 'Na🅱e';
  })
  // Sets whether function emojis should be deployed after navigation emojis
  .setEmojisFunctionAfterNavigation(false);

FieldsEmbed.embed
  .setColor(0xFF00AE)
  .setDescription('Test Description');

await FieldsEmbed.build();

// Will not log until FieldsEmbed.build() is finished
console.log('done');
```
![FieldsEmbed2](https://github.com/gazmull/discord-paginationembed/blob/stable/demo/FieldsEmbed2.gif?raw=true)

> ### Declare Embeds

```js
const { RichEmbed } = require('discord.js');
const embeds = [];

for (let i = 0; i < 5; ++i)
  embeds.push(new RichEmbed().addField('Page', i + 1));
```

### `Embeds` Mode

```js
const myImage = message.author.displayAvatarURL;

new Pagination.Embeds()
  .setArray(embeds)
  .setAuthorizedUsers([message.author.id])
  .setChannel(message.channel)
  .setPageIndicator(true)
  .setPage(3)
   // Methods below are for customising all embeds
  .setImage(myImage)
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
![Embeds](https://user-images.githubusercontent.com/32944712/37118454-41116cbe-228f-11e8-9878-f39db26316a1.png)

> This assumes this is under an `async` function

```js
const Embeds = new PaginationEmbed.Embeds()
  .setArray(embeds)
  .setAuthorizedUsers([message.author.id])
  .setChannel(message.channel)
  .setPageIndicator(true)
  .setTitle('Test Title')
  .setDescription('Test Description')
  .setFooter('Test Footer Text')
  .setURL('https://gazmull.github.io/discord-paginationembed')
  .setColor(0xFF00AE)
  // Sets the client's assets to utilise. Available options:
  //  - message: the client's Message object (edits the message instead of sending new one for this instance)
  //  - prompt: custom content for the message sent when prompted to jump to a page
  //      {{user}} is the placeholder for the user mention
  .setClientAssets({ message, prompt: 'Page plz {{user}}' })
  .setDeleteOnTimeout(true)
  .setDisabledNavigationEmojis(['DELETE'])
  .setFunctionEmojis({
    '⬆': (_, instance) => {
      for (const embed of instance.array)
        embed.fields[0].value++;
    },
    '⬇': (_, instance) => {
      for (const embed of instance.array)
        embed.fields[0].value--;
    }
  })
  // Listeners for PaginationEmbed's events
  // Upon successfull `build()`
  .on('start', () => console.log('Started!'))
  // Upon a user deleting the embed
  .on('finish', (user) => console.log(`Finished! User: ${user.username}`))
  // Upon a user reacting to the embed
  .on('react', (user, emoji) => console.log(`Reacted! User: ${user.username} | Emoji: ${emoji.name} (${emoji.id})`))
  // Upon the awaiting time expired
  .on('expire', () => console.warn('Expired!'))
  // Upon non-PaginationEmbed error (e.g: Discord API Error)
  .on('error', console.error);

await Embeds.build();
```
![Embeds2](https://github.com/gazmull/discord-paginationembed/blob/stable/demo/Embeds.gif?raw=true)

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
> [**MIT**](https://github.com/gazmull/discord-paginationembed/blob/stable/LICENSE)

© 2018-present [**Euni (gazmull)**](https://github.com/gazmull)

