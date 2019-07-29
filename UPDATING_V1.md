# Updating From `v0.7.7-v11`

## Notice
- This is for Discord.JS v11 (stable) variant. If you're looking for Discord.JS v12 (master) variant, please visit this instead: [Click me](https://github.com/gazmull/discord-paginationembed/blob/master/UPDATING_V1.md)

## Installation
New way to install the utility is from NPM: `npm install discord-paginationembed`

## TypeScript
For importing types to your TypeScript project:
```ts
import { Embeds, FieldsEmbed, IClientAssets } from 'discord-paginationembed';
```

Typings also provide type parameter for `FieldsEmbed` mode to help you identify your element's properties:
```ts
interface LegendaryInterface {
  pakaluPapito: string;
  hotel?: 'Trivago';
}

const fieldsEmbed = new FieldsEmbed<LegendaryInterface>();
```

![Types](https://github.com/gazmull/discord-paginationembed/blob/stable/demo/Types.png?raw=true)

## API Changes
### `showPageIndicator` ➡ `setPageIndicator`

---

### `channel` **must** be set

Before, it's either `clientAssets.message` or `channel` is set, but this makes an unnecessary API call (could lead to ratelimit) via sending/editing a dummy message with `clientAssets.prepare`'s content. By removing `clientAssets.prepare`, setting the channel is now a must while `clientAssets.message` is still optional.

---

### Passing an object to the constructor removed
Method `object as constructor` no longer exists, instead use the methods provided such as `setArray()`.

#### Old way
```js
new FieldsEmbed({ array: [ { name: 'yes' } ] })
  .setAuthorizedUsers([ message.author.id, ...mentionedUsers ]);
```

#### New way
```js
new FieldsEmbed()
  .setArray([ { name: 'yes' } ])
  .setAuthorizedUsers([ message.author.id, ...mentionedUsers ]);
```

---

### `clientMessage` ➡ `clientAssets`
`clientMessage` has been replaced with `clientAssets`: similar API but the latter takes an object as the only parameter. Option `prompt` has been added for customising the content for message to send when prompted to jump to a page while `prepare` option has been removed due to unnecessary API call.

#### `clientMessage` (Old way)
```js
new FieldsEmbed()
  .setClientMessage(clientMessage, 'yo!');
```

#### `clientAssets` (New way)
**Note**: `{{user}}` is the placeholder for a user mention.
```js
new FieldsEmbed()
  .setClientAssets({
    message: clientMessage,
    prompt: 'Yo {{user}} what page?' // Option for message content when prompted to jump to a page.
  });
```

---

### Customised `FieldsEmbed`'s `RichEmbed`
All `RichEmbed` methods for `FieldsEmbed` mode has been moved to `FieldsEmbed#embed`.

#### Old way
```js
new FieldsEmbed()
  .setColor('RANDOM');
```

#### New way
```js
new FieldsEmbed().embed
  .setColor('RANDOM');
```
