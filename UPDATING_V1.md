# Updating From `v0.8.0`

## Notice
If you are from stable branch (v11), then this will no longer work for you as its support has been suspended (this package only).

## Installation
New way to install the utility is from NPM: `npm install discord-paginationembed`

## TypeScript
For importing types to your TypeScript project:
```ts
import Embeds from 'discord-paginationembed/typings/Embeds';
import FieldsEmbed from 'discord-paginationembed/typings/FieldsEmbed';

// Unlikely
import { IClientAssets } from 'discord-paginationembed/typings/base';
```

## API Changes
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
`clientMessage` has been renamed to `clientAssets`. Another option, `prompt`, has been added for customising the message content for `when prompted to jump to a page`.

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