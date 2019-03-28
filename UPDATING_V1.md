# Updating From `v0.8.0`

## Notice
If you are from **stable branch (v11)**, then this will no longer work for you as its support has been suspended (this package only).

## Installation
New way to install the utility is from NPM: `npm install discord-paginationembed`

### ❗ Heads Up!
There might be a decision to suddenly resume support for **v11**. So if it ever happens, **master branch (v12)**'s installation would be `npm install discord-paginationembed@canary`

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

![Types](https://github.com/gazmull/discord-paginationembed/blob/master/demo/Types.png?raw=true)

## API Changes
### `showPageIndicator` ➡ `setPageIndicator`

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
`clientMessage` has been replaced with `clientAssets`: similar API but the latter takes an object as the only parameter. Another option, `prompt`, has been added for customising the message content for `when prompted to jump to a page`.

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
    prepare: 'Preparing...', // Option for message content while preparing the paginated embed
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
