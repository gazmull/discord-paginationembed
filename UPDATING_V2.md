# Updating From v1

## TypeScript

`I` prefix on interfaces has been removed.

#### From
```ts
import { IClientAssets, IFunctionEmoji, INavigationEmojis } from 'discord-paginationembed';
```

#### To
```ts
import { ClientAssets, FunctionEmoji, NavigationEmojis } from 'discord-paginationembed';
```

## API Changes

### Removal of `Embeds`#`addBlankField`()
This method has been removed to reflect Discord.JS' MessageEmbed changes. As a workaround for this, use:
```js
<Embeds>.addField('\u200b', '\u200b')
```

### `Embeds`#`spliceField`() => `Embeds`#`spliceFields`()
Same reason above.

### `pageIndicator` => `usePageIndicator`
This shouldn't be a big issue unless you're using it this way: `<PaginationEmbed>.pageIndicator = true` (which is not really recommended). The change was made to make way for getter `pageIndicator` for the addition of customising indicator:

From `CHANGELOG.md`:
> - `setPageIndicator` is now powerful for customisation.
>   - First parameter has additional option `footer` (makes the indicator replace the embed's footer text instead).
>       - `footer` option will not *directly* modify embeds from `array` when using `Embeds` mode.
>   - Second parameter has been added for indicator's formatting function: either use the following pre-made formats `'text' | 'textcompact' | 'circle' | 'hybrid'` — or make your own format.
>   - In case you don't like the placing of the indicator (i.e. you want it in embed title instead), you can set the first parameter as false but set the second parameter to your preferred format and later on use the format by accessing getter `pageIndicator` then modify the embed via `pageUpdate` event.
>   - **Example**
>       - ```js
>           <PaginationEmbed>.setPageIndicator('footer', (page, pages) => `peij ${page} 0f ${pages} - xoxo`)
>         ```
>   - Pre-made formats preview:
>       - **(default)** text: `Page 1 of 2`
>       - textcompact: `1/2`
>       - circle: `● ○`
>       - hybrid: `[1/2] ● ○`

### `usePageIndicator`'s (Formerly `pageIndicator`) Default: `true` => `false`

### Navigation Emoji Identfiers (`BACK`, `JUMP`, `FORWARD`, `DELETE`, `ALL`) => Lowercased
They have been lowercased for code optimisation.

### Event `pageUpdate` Relocated
Event `pageUpdate` has been relocated to emit at initial page as well. This is to give more control for customised page indicator.

## Miscellaneous

### `setAuthorizedUsers` Now Accepting Non-Array Parameter
This has been added since this utility is frequently used singularly.

```diff
- <PaginationEmbed>.setAuthorizedUsers([message.author.id])
+ <PaginationEmbed>.setAuthorizedUsers(message.author.id)
```
