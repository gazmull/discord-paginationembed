# Updating From `v0.8.0`

## Notice
- This documentation will be changed without prior notice for any changes in v1's source code. In some cases, commit messages will notify everyone that this documentation has been changed.
- If you are from **stable branch (v11)**, then look [**here**](https://github.com/gazmull/discord-paginationembed/blob/stable/UPDATING_V1.md).

## Installation
New way to install the utility is from NPM: `npm install discord-paginationembed@beta`

## TypeScript
> ***Since v2.0.0***: `I` prefix from interfaces has been removed.

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

![Types](https://github.com/gazmull/discord-paginationembed/blob/master/demo/Types.png?raw=true)

## API Changes
### `showPageIndicator` ➡ `setPageIndicator`
> Since **v1.0.0-beta.2**

---

### `channel` **must** be set
> Since **v1.0.0-beta.4**

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
`clientMessage` has been replaced with `clientAssets`: similar API but the latter takes an object as the only parameter. Option `prompt` was added for customising the content for message to send when prompted to jump to a page.

- [**since v1.0.0-beta.4**] `prepare` option has been removed due to unnecessary API call.

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

### Customised `FieldsEmbed`'s `MessageEmbed`
All `MessageEmbed` methods for `FieldsEmbed` mode has been moved to `FieldsEmbed#embed`.

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
