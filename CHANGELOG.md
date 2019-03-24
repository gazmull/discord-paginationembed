# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]
[**Updating from `v0.8.0`**](UPDATING_V1.md)

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

[Unreleased]: https://github.com/gazmull/discord-paginationembed/compare/0.8.0...HEAD
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
