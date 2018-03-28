<div align="center">
<a href="https://travis-ci.org/gazmull/discord-paginationembed"><img src="https://travis-ci.org/gazmull/discord-paginationembed.svg?branch=v11" alt="Build Status" /></a>
</div>

# Discord.JS - Pagination Embed
A pagination utility for RichEmbed in Discord.JS

Installing the utility: `npm install gazmull/discord-paginationembed#v11`

Requires Discord.JS: `npm install discord.js`

# Compatibility
Supports both v11 and v12.

v12 installation: `npm install gazmull/discord-paginationembed`

# Examples
> ### Under `message` event

```js
const { FieldsEmbed: FieldsEmbedMode } = require('discord-paginationembed');

new FieldsEmbedMode()
  .setArray([ { name: 'John Doe' }, { name: 'Jane Doe' } ])
  .setAuthorizedUser(message.author)
  .setChannel(message.channel)
  .setElementsPerPage(1)
  .setPage(2)
  .showPageIndicator(false)
  .formatField('Name', i => i.name)
  .build();
```
```js
const { Embeds: EmbedsMode } = require('discord-paginationembed');
const { RichEmbed } = require('discord.js');

const embeds = [];

for (let i = 0; i < 5; ++i)
  embeds.push(new RichEmbed().addField('Page', i + 1));

const myImage = message.author.displayAvatarURL;

new EmbedsMode()
  .setArray(embeds)
  .setAuthorizedUser(message.author)
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
![image](https://user-images.githubusercontent.com/32944712/37118454-41116cbe-228f-11e8-9878-f39db26316a1.png)


# Links
* [**Documentation**](https://gazmull.github.io/discord-paginationembed "Go to My Documentation")
* [**Discord.JS**](https://discord.js.org/#/docs/main/master/general/welcome "Go to Discord.JS Master Documentation")

# Contributing
* Fork this repository.
* Execute `npm install`
* Code and code and code and code and... code!
* `npm test` to verify if your additions/adjustments are following ESLint's rules and to verify if the docs are valid.
* File a [Pull Request](https://github.com/gazmull/discord-paginationembed/compare)!

# License
MIT
