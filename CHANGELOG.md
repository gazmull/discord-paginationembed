# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

This version involves reflection of official release of Discord.JS 12, code optimisations, and changes that will give the user more control to the instance
such as customisable page indicator, and favourable event emissions.

### Added
- (ft. [@cycloptux]) - `setPageIndicator` is now powerful for customisation.
  - First parameter has additional option `footer` (makes the indicator replace the embed's footer text instead).
    - `footer` option will not *directly* modify embeds from `array` when using `Embeds` mode.
  - Second parameter has been added for indicator's formatting function: either use the following pre-made formats `'text' | 'textcompact' | 'circle' | 'hybrid'` — or make your own format.
  - In case you don't like the placing of the indicator (i.e. you want it in embed title instead), you can set the first parameter as false but set the second parameter to your preferred format and later on use the format by accessing getter `pageIndicator` then modify the embed via `pageUpdate` event.
  - **Example**
    - ```js
      <PaginationEmbed>.setPageIndicator('footer', (page, pages) => `peij ${page} 0f ${pages} - xoxo`)
        ```
    - Pre-made formats preview:
      - **(default)** text: `Page 1 of 2`
      - textcompact: `1/2`
      - circle: `● ○`
      - hybrid: `[1/2] ● ○`
- `setAuthorizedUsers` now accepts a user ID as well instead of just an array of user IDs.

### Changed
- **⚠ BREAKING** - `Embeds` mode's changes to reflect Discord.JS' MessageEmbed methods:
  - Removed `addBlankField`
  - `spliceField` renamed to `spliceFields`
  - Added `addFields`
- **⚠ BREAKING** - Removed `I` prefix on the following TypeScript interfaces: `INavigationEmojis`, `IClientAssets`, `IFunctionEmoji`
- **⚠ BREAKING** - Renamed property `pageIndicator` to `usePageIndicator`
- **⚠ BREAKING** - Navigation emoji identifiers (`BACK`, `JUMP`, `FORWARD`, `DELETE`, `ALL`) has been lowercased due to unnecessary internal transformations.
- `usePageIndicator`'s default is now set to false.
- Event `pageUpdate` has been relocated to emit at initial page as well.
- Events' JSDoc description has been improved.
- ([@cycloptux]) - Peer dependency Discord.JS version updated to `^12.0.0`
- README's example has been updated to reduce complexity.

### Fixed
- ([@d-shaun]) - Undesirable placement of `start` event's emission

### Internal
- (ft. [@cycloptux]) - Test script `bot.js` updated for new changes
- Migrated linter from TSLint to ESLint

[@cycloptux]: https://github.com/cycloptux
[@d-shaun]: https://github.com/d-shaun

## [2.0.0-beta.4] - 2020-02-14
Utility has been updated to support the breaking change feature `Managers`. Starting from this version it will no longer support the [Discord.JS](https://github.com/discordjs/discord.js) master commits earlier than [`bbdbc4c`](https://github.com/discordjs/discord.js/commit/bbdbc4cfa789383b7b3dbecf5e6b8401ea2dd998).

## [2.0.0-beta.3] - 2020-01-21

### Added
- `attachFiles` method for Embeds mode
- `pageUpdate` event (emitted when the page number is updated via reaction)
- Verbose documentation to `navigationEmojis` and `functionEmojis`

### Changed
- Test script `bot.js` updated for new features

### Fixed
- Incorrect documentation examples for FieldsEmbed mode
- Fix `Unknown Message` error when `deleteOnTimeout` is enabled

## [2.0.0-beta.2] - 2019-11-12

### Fixed
- Embeds mode's `_loadList` overwriting existing message content

## [2.0.0-beta.1] - 2019-11-09

### Added
- Documentation example for IFunctionEmoji: stopping the instance from awaiting reacts with function emojis

### Changed
- Documentation changes involving `page` and `pages` properties

### Fixed
- Incorrect installation note on `UPDATING_V1.md`
- FieldsEmbed mode's `_loadList` overwriting existing message content

## [2.0.0-beta.0] - 2019-07-29
Nothing new, but incremented version to make way for updated Discord.JS v11 variant release.

## [1.0.0] - 2019-07-29
Latest release for [v11 branch](https://github.com/gazmull/discord-paginationembed/tree/v11). See changes below from 1.0.0-beta.0.

**Master branch (For Discord.JS v12)** has been incremented to `2.0.0-beta.0`

## [1.0.0-beta.4] - 2019-04-26
[**Updating from `v0.8.0`**](UPDATING_V1.md#api-changes) (Updated, please read again)

### Added
- Added ability to stop the instance from awaiting emoji reacts with function emojis:
    ```js
    <PaginationEmbed>.addFunctionEmoji('🛑', () => {
        // Either
        throw 'stopped';

        // or
        return Promise.reject('stopped');

        // will stop the instance from awaiting reacts.
        // Passing an error object will emit the `error` event.
    });
    ```
- Added `PaginationEmbed#setEmojisFunctionAfterNavigation` method. This allows function emojis to either be the first/last set to be deployed before/after navigation emojis.
  -  Default: `false`.

### Changed
- PaginationEmbed no longer emits an event when there is no listener (invoking `.on`/`.once`)

### Removed
- Option `prepare` for `clientAssets` has been removed. This affects:
    - Setting the `channel` property is a must now. (Used to be either `clientAssets.message` or `channel` must be set)

### Fixed
- Fixed possibly unnecessary API call on awaiting emoji reacts timeout.
  - `clientMessage#delete` now precedes `clientMessage.reactions#removeAll`

## [1.0.0-beta.3] - 2019-03-31
### Added
- More TypeScript notices
- Master branch (unreleased) installation

### Changed
- Beautify bin output

### Fixed
- Unnecessary recasting of MessageEmbed on FieldsEmbed#_loadList
- Error handling
- Unnecessary re-setting clientAssets on `_verify()`

## [1.0.0-beta.2] - 2019-03-27
[**Updating from `v0.8.0`**](UPDATING_V1.md) (Updated, please read again)

### Added
- Examples for README

### Changed
- Updated `UPDATING_V1.md`
- File structure: typings imports for TypeScript projects has been changed:
  #### Old way
  ```ts
  import Embeds from 'discord-paginationembed/typings/Embeds';
  import FieldsEmbed from 'discord-paginationembed/typings/FieldsEmbed';

  // Unlikely
  import { IClientAssets } from 'discord-paginationembed/typings/base';
  ```

  #### New way
  ```ts
  import { Embeds, FieldsEmbed, IClientAssets } from 'discord-paginationembed';
  ```
- `showPageIndicator` ➡ `setPageIndicator`

### Fixed
- Non-working examples
- Page number that is out of bounds being ignored on `build()`
- Missing message **and** channel objects being ignored
- Undefined array being ignored on `Embeds` mode methods

## [1.0.0-beta.1] - 2019-03-26
[**Updating from `v0.8.0`**](UPDATING_V1.md)

### Added
- New features testing for the test unit
- `Updating to v1` readme
- Badges for README
- Gulp tasks

### Changed
- Files structure

### Removed
- Unnecessary NPM package assets being included on publish
- NPM tasks related to package building in favour of Gulp tasks

### Fixed
- Typings for events and superclass
- Superclass `EventEmitter`'s methods/properties from docs (docs noises)
- `start` event not being fired at all

## [1.0.0-beta.0] - 2019-03-25
[**Updating from `v0.8.0`**](UPDATING_V1.md)

If the link above is unavailable, you may proceed to the [**documentation**](https://docs.thegzm.space/discord-paginationembed) site instead.

### Added
- NPM publish
- Package scripts and configs
- Changelog added
- PaginationEmbed events (from superclass `EventEmitter`)
- Customisable `prompt` message (under `clientAssets.prompt`)

### Changed
- `MessageEmbed` superclass changed to `EventEmitter`
- `MessageEmbed` customisations for `FieldsEmbed` mode can only be access via `embed` property. e.g:
```js
<FieldsEmbed>.embed
  .setColor('red')
  .setTitle('A customised embed')
```
- `clientMessage` ➡ `clientAssets`; including its method
- Source code: from `JavaScript` to `TypeScript`
- Tweaked typings and documentation
- `README` revamped (please read)

### Removed
- Dependencies-relevant: `yarn.lock` and `eslint`-relevant
- Object parameter to construct an instance. Please use the methods instead

### Fixed
- Current instance not being awaited properly on asynchronous functions. As example, your code that looks like this will work as expected now:
```js
// e.g: A command has a cooldown/ratelimit for using this instance, we should wait for the instance to finish everything (either user deletes or expires the session) before we can let the user use this command again.
await <Embeds>.build();

return 'done!';
```
- Better typings and docs references

## [0.8.0] - 2019-03-12
### Added
- Added .catch() for clientMessage deletion (#23)
- Reflected MessageEmbed API (added SpliceFields, and setTimestamp now accepts a specified timestamp/date)
- Added declaration file for TypeScript users

### Changed
- README has been cleaned up (removed v11 branch deprecation notice too)
- Documentation site changed from JSDoc to TypeDoc
- Use yarn command on package scripts (due to yarn.lock)

### Removed
- Discord.JS stable compatibility (*-v11)

### Fixed
- Better array checking
- FieldsEmbed Mode no longer puts its pageIndicator on embed description, puts at the message content instead.

## [0.7.7] | [0.7.7-v11] - 2018-07-03
### Added
  - `functionEmoji` - customised emojis with specific function (#8)
  - `deleteOnTimeout` - option to delete the message upon `awaiting response` timeout (#11)
  - `test` folder for `FieldsEmbed` and `Embeds` test bot

### Changed
  - Major [documentation](https://gazmull.github.io/discord-paginationembed) changes
  - `authorizedUsers` is now an `Array<User.id>` type (#9)
  - `Embeds` will now show `clientMessage.content` after `pageIndicator`
  - `emojis` to `navigationEmojis`
  - `NavigationButtons` to `NavigationEmojis`
  - `setEmojis` to `setNavigationEmojis`

### Removed
  - `docs` folder; transferred to `gh-pages` branch

### Fixed
  - Support for DMs (except for message/reaction deletes).

## [0.2.3] | [0.2.3-v11] - 2018-06-13
### Added
  - Mention user on jump page prompt

### Fixed
  - Original content not being kept when page indicator was not set to true
  - JSDoc Typos

## [0.2.2] | [0.2.2-v11] - 2018-05-28
### Added
  - Discord.JS stable compatibility (*-v11)
### Fixed
  - Buttons still showing up even if the total pages are 1~2

## [0.2.1] - 2018-03-29
### Fixed
  - Buttons being 'reacted' after navigation prompt (borderline API spam)

## [0.2.0] - 2018-03-09
### Changed
  - `authorisedUser` / `setAuthorisedUser` ➡️  `authorizedUser` / `setAuthorizedUser`
  - First parameter on all methods are now required
  - Every method that returns the current instance of `FieldsEmbed` / `Embeds` class is now renamed to `PaginationEmbed` to avoid inconsistency
  - Typedef tweak for `currentEmbed` and `elementList`
  - Tweaked examples for consistency
  - Discord.JS is now under `peerDependencies` instead of `dependencies`

## [0.1.0] - 2018
### Added
  - Initial release

[Unreleased]: https://github.com/gazmull/discord-paginationembed/compare/2.0.0-beta.4...HEAD
[2.0.0-beta.4]: https://github.com/gazmull/discord-paginationembed/compare/2.0.0-beta.3...2.0.0-beta.4
[2.0.0-beta.3]: https://github.com/gazmull/discord-paginationembed/compare/2.0.0-beta.2...2.0.0-beta.3
[2.0.0-beta.2]: https://github.com/gazmull/discord-paginationembed/compare/2.0.0-beta.1...2.0.0-beta.2
[2.0.0-beta.1]: https://github.com/gazmull/discord-paginationembed/compare/2.0.0-beta.0...2.0.0-beta.1
[2.0.0-beta.0]: https://github.com/gazmull/discord-paginationembed/compare/1.0.0-beta.4...2.0.0-beta.0
[1.0.0]: https://github.com/gazmull/discord-paginationembed/compare/1.0.0-beta.4...1.0.0
[1.0.0-beta.4]: https://github.com/gazmull/discord-paginationembed/compare/1.0.0-beta.3...1.0.0-beta.4
[1.0.0-beta.3]: https://github.com/gazmull/discord-paginationembed/compare/1.0.0-beta.2...1.0.0-beta.3
[1.0.0-beta.2]: https://github.com/gazmull/discord-paginationembed/compare/1.0.0-beta.1...1.0.0-beta.2
[1.0.0-beta.1]: https://github.com/gazmull/discord-paginationembed/compare/1.0.0-beta.0...1.0.0-beta.1
[1.0.0-beta.0]: https://github.com/gazmull/discord-paginationembed/compare/0.8.0...1.0.0-beta.0
[0.8.0]: https://github.com/gazmull/discord-paginationembed/compare/0.7.7...0.8.0
[0.7.7]: https://github.com/gazmull/discord-paginationembed/compare/0.2.3...0.7.7
[0.7.7-v11]: https://github.com/gazmull/discord-paginationembed/compare/0.2.3-v11...0.7.7-v11
[0.2.3]: https://github.com/gazmull/discord-paginationembed/compare/0.2.2...0.2.3
[0.2.3-v11]: https://github.com/gazmull/discord-paginationembed/compare/0.2.2...0.2.3-v11
[0.2.2]: https://github.com/gazmull/discord-paginationembed/compare/0.2.1...0.2.2
[0.2.2-v11]: https://github.com/gazmull/discord-paginationembed/compare/0.2.1...0.2.2-v11
[0.2.1]: https://github.com/gazmull/discord-paginationembed/compare/0.2.0...0.2.1
[0.2.0]: https://github.com/gazmull/discord-paginationembed/compare/b63b22167373ef0f9c0bc2ab45d6ca9554ab83c2...0.2.0
[0.1.0]: https://github.com/gazmull/discord-paginationembed/commit/b63b22167373ef0f9c0bc2ab45d6ca9554ab83c2
