<div align="center">
<a href="https://travis-ci.org/gazmull/discord-paginationembed"><img src="https://travis-ci.org/gazmull/discord-paginationembed.svg?branch=master" alt="Build Status" /></a>
</div>

# Discord.JS - Pagination Embed
A pagination utility for MessageEmbed in Discord.JS

`npm install gazmull/discord-paginationembed`

# Compatibility
Currently supports Discord.JS v12.

# Examples
> ### Under `message` event

```js
const FieldsEmbedMode = require('discord-paginationembed').FieldsEmbed;

new FieldsEmbedMode()
  .setArray([ { name: "John Doe" }, { name: "Jane Doe" } ])
  .setAuthorisedUser(message.author)
  .setChannel(message.channel)
  .setElementsPerPage(1)
  .setPage(2)
  .showPageIndicator(false)
  .build();
```
```js
const EmbedsMode = require('discord-paginationembed').Embeds;
const { MessageEmbed } = require("discord.js");

const embeds = [];

for (let i = 0; i < 5; ++i)
  embeds.push(new MessageEmbed().addField('Page', i + 1));

const myImage = message.author.displayAvatarURL();

new EmbedsMode()
  .setArray(embeds)
  .setAuthorisedUser(message.author)
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
* `npm test` to verify your additions/adjustments are following ESLint's rules and verify docs are valid.
* File a [Pull Request](https://github.com/gazmull/discord-paginationembed/compare)!

# License
MIT
