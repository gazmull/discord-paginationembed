/// <reference types="node" />
import { DMChannel, Emoji, Message, Snowflake, TextChannel, User } from 'discord.js';
import { EventEmitter } from 'events';
import { Embeds } from '../Embeds';
import { FieldsEmbed } from '../FieldsEmbed';
/**
 * The base class for Pagination Modes. **Do not invoke**.
 * @extends [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter)
 * @noInheritDoc
 */
export declare class PaginationEmbed<Element> extends EventEmitter {
    constructor();
    /** The authorized users to navigate the pages. Default: `everyone` */
    authorizedUsers: Snowflake[];
    /** The channel where to send the embed. */
    channel: TextChannel | DMChannel;
    /** Settings for assets for the client. */
    clientAssets: ClientAssets;
    /** An array of elements to paginate. */
    array: Element[];
    /**
     * Whether to show page indicator, or put it in embed's footer text (replaces the existing text) instead.
     * Default: `false`
     */
    usePageIndicator: boolean | 'footer';
    /**  Whether the client's message will be deleted upon timeout. Default: `false` */
    deleteOnTimeout: boolean;
    /** The current page. Default: `1` */
    page: number;
    /** The time for awaiting a user action before timeout in ms. Default: `30000` */
    timeout: number;
    /**
     * The emojis used for navigation emojis.
     * Navigation emojis are the default message reactions for navigating through the pagination.
     */
    navigationEmojis: NavigationEmojis;
    /**
     * The emojis used for function emojis.
     * Function emojis are user-customised message reactions
     * for modifying the current instance of the pagination such as modifying embed texts, stopping the pagination, etc.
     */
    functionEmojis: FunctionEmoji<Element>;
    /**
     * The disabled navigation emojis.
     * Available navigation emojis to disable:
     * - 'back'
     * - 'jump'
     * - 'forward'
     * - 'delete'
     * - 'all'
     */
    disabledNavigationEmojis: ('back' | 'jump' | 'forward' | 'delete' | 'all')[];
    /** Whether to set function emojis after navigation emojis. Default: `false` */
    emojisFunctionAfterNavigation: boolean;
    /** Number of pages for this instance. */
    pages: number;
    /** The disabled navigation emojis (in values). */
    protected _disabledNavigationEmojiValues: any[];
    /** The default navigation emojis. Used for resetting the navigation emojis. */
    protected _defaultNavigationEmojis: {
        back: string;
        jump: string;
        forward: string;
        delete: string;
    };
    /** The function for formatting page indicator. */
    protected _pageIndicator: PageIndicatorCaster;
    /** Pre-made functions for formatting page indicator. */
    protected _defaultPageIndicators: {
        [x: string]: PageIndicatorCaster;
    };
    /** The formatted page indicator. Default format: `text` */
    get pageIndicator(): string;
    build(): void;
    /**
     * Adds a function emoji to the embed.
     *
     * ### Example
     * ```js
     *  <PaginationEmbed>.addFunctionEmoji('🅱', (_, instance) => {
     *    const field = instance.embed.fields[0];
     *
     *    if (field.name.includes('🅱'))
     *      field.name = 'Name';
     *    else
     *      field.name = 'Na🅱e';
     *  });
     * ```
     * @param emoji - The emoji to use as the function's emoji.
     * @param callback - The function to call upon pressing the function emoji.
     */
    addFunctionEmoji(emoji: string, callback: (user: User, instance: Embeds | FieldsEmbed<Element>) => any): this;
    /**
     * Deletes a function emoji.
     * @param emoji - The emoji key to delete.
     */
    deleteFunctionEmoji(emoji: string): this;
    /** Deletes all function emojis, and then re-enables all navigation emojis. */
    resetEmojis(): this;
    /**
     * Sets the array of elements to paginate. This must be called first before any other methods.
     * @param array - An array of elements to paginate.
     */
    setArray(array: Element[]): this;
    /**
     * Set the authorized users to navigate the pages.
     * @param users - A user ID or an array of user IDs.
     */
    setAuthorizedUsers(users: Snowflake | Snowflake[]): this;
    /**
     * The channel where to send the embed.
     * @param channel - The channel object.
     */
    setChannel(channel: TextChannel | DMChannel): this;
    /**
     * Sets the settings for assets for the client.
     * @param assets - The assets for the client.
     */
    setClientAssets(assets: ClientAssets): this;
    /**
     * Sets the disabled navigation emojis.
     *
     * ### Example
     * ```js
     *  // Disable specific navigation emojis
     *  <PaginationEmbed>.setDisabledNavigationEmojis(['delete', 'jump']);
     *
     *  // Disable all navigation emojis
     *  <PaginationEmbed>.setDisabledNavigationEmojis(['all']);
     * ```
     *
     * @param emojis  - An array of navigation emojis to disable.
     */
    setDisabledNavigationEmojis(emojis: DisabledNavigationEmojis): this;
    /**
     * Sets whether to set function emojis after navigation emojis.
     * @param boolean - Set function emojis after navigation emojis?
     */
    setEmojisFunctionAfterNavigation(boolean: boolean): this;
    /**
     * Sets the emojis used for function emojis.
     *
     * ### Example
     * ```js
     *  <PaginationEmbed>.setFunctionEmojis({
     *    '🔄': (user, instance) => {
     *      const field = instance.embed.fields[0];
     *
     *      if (field.name === 'Name')
     *        field.name = user.tag;
     *      else
     *        field.name = 'Name';
     *    }
     *  });
     * ```
     * @param emojis - An object containing customised emojis to use as function emojis.
     */
    setFunctionEmojis(emojis: FunctionEmoji<Element>): this;
    /**
     * Sets the emojis used for navigation emojis.
     * @param emojis - An object containing customised emojis to use as navigation emojis.
     */
    setNavigationEmojis(emojis: NavigationEmojis): this;
    /**
     * Sets to jump to a certain page upon calling PaginationEmbed.build().
     * @param page - The page number to jump to.
     */
    setPage(page: number | 'back' | 'forward'): this;
    /**
     * Sets the time for awaiting a user action before timeout in ms.
     * @param timeout Timeout value in ms.
     */
    setTimeout(timeout: number): this;
    /**
     * Sets the page indicator formatting function and placement.
     * @param enabled - Whether to show page indicator.
     *   Pass `footer` to display the indicator in embed's footer text (replaces existing text) instead.
     * @param fn - Function for indicator formatting.
     */
    setPageIndicator(enabled: boolean | 'footer', fn?: PageIndicatorPreMadeTypes | PageIndicatorCaster): this;
    /**
     * Sets whether the client's message will be deleted upon timeout.
     * @param deleteOnTimeout - Delete client's message upon timeout?
     */
    setDeleteOnTimeout(boolean: boolean): this;
    /**
     * Evaluates the constructor and the client.
     * @ignore
     */
    _verify(): Promise<boolean>;
    /**
     * Checks the permissions of the client before sending the embed.
     * @ignore
     */
    _checkPermissions(): Promise<boolean>;
    /**
     * Returns whether the given navigation emoji is enabled.
     * @param emoji The navigation emoji to search.
     */
    protected _enabled(emoji: NavigationEmojiIdentifier): boolean;
    /** Deploys emoji reacts for the message sent by the client. */
    protected _drawEmojis(): Promise<void>;
    /** Deploys function emojis. */
    protected _drawFunctionEmojis(): Promise<void>;
    /** Deploys navigation emojis. */
    protected _drawNavigationEmojis(): Promise<void>;
    /**
     * Helper for intialising the MessageEmbed.
     * [For sub-class] Initialises the MessageEmbed.
     * @param callNavigation - Whether to call _drawEmojis().
     * @ignore
     */
    _loadList(callNavigation?: boolean): Promise<void>;
    /**
     * Calls PaginationEmbed.setPage() and then executes `_loadList()` and `_awaitResponse()`.
     * @param param - The page number to jump to.
     */
    protected _loadPage(param?: number | 'back' | 'forward'): Promise<void>;
    /** Awaits the reaction from the user(s). */
    protected _awaitResponse(): Promise<void>;
    /**
     * Only used for `_awaitResponse`:
     * Deletes the client's message, and emits either `error` or `finish` event depending on the passed parameters.
     * @param err The error object.
     * @param clientMessage The client's message.
     * @param expired Whether the clean up is for `expired` event.
     * @param user The user object (only for `finish` event).
     */
    protected _cleanUp(err: any, clientMessage: Message, expired?: boolean, user?: User): Promise<void>;
    /**
     * Awaits the custom page input from the user.
     * @param user - The user who reacted to jump on a certain page.
     */
    protected _awaitResponseEx(user: User): Promise<void>;
    /**
     * Emitted after the initial embed has been sent
     * (technically, after the client finished reacting with enabled navigation and function emojis).
     * @event
     */
    on(event: 'start', listener: () => void): this;
    /**
     * Emitted when the instance is finished by a user reacting with `delete` navigation emoji
     * or a function emoji that throws non-Error type.
     * @event
     */
    on(event: 'finish', listener: ListenerUser): this;
    /**
     * Emitted after the page number is updated and before the client sends the embed.
     * @event
     */
    on(event: 'pageUpdate', listener: () => void): this;
    /**
     * Emitted upon a user reacting on the instance.
     * @event
     */
    on(event: 'react', listener: ListenerReact): this;
    /**
     * Emitted when the awaiting timeout is reached.
     * @event
     */
    on(event: 'expire', listener: () => void): this;
    /**
     * Emitted upon an occurance of error.
     * @event
     */
    on(event: 'error', listener: ListenerError): this;
    /** @event */
    once(event: 'finish', listener: ListenerUser): this;
    /** @event */
    once(event: 'start' | 'expire' | 'pageUpdate', listener: () => void): this;
    /** @event */
    once(event: 'react', listener: ListenerReact): this;
    /** @event */
    once(event: 'error', listener: ListenerError): this;
}
/**  @param user The user who responded to the instance. */
export declare type ListenerUser = (user: User) => void;
/**
 * @param user The user who responded to the instance.
 * @param emoji The emoji that was reacted to the instance.
 */
export declare type ListenerReact = (user: User, emoji: Emoji) => void;
/** @param err The error object. */
export declare type ListenerError = (err: Error) => void;
/** Options for [[PaginationEmbed.disabledNavigationEmojis]]. */
export declare type DisabledNavigationEmojis = NavigationEmojiIdentifier[];
/** An object containing emojis to use as navigation emojis. */
export interface NavigationEmojis {
    back: string | '◀';
    jump: string | '↗';
    forward: string | '▶';
    delete: string | '🗑';
}
/** Assets for the client (message). */
export interface ClientAssets {
    /** The message object. */
    message?: Message;
    /**
     * The text during a prompt for page jump.
     *
     * To include a user mention in the text, use `{{user}}` as placeholder.
     *
     * Default: `"{{user}}, To what page would you like to jump? Say 'cancel' or '0' to cancel the prompt."`
     */
    prompt?: string;
}
export declare type NavigationEmojiIdentifier = 'back' | 'jump' | 'forward' | 'delete' | 'all';
/**
 * Function for a custom emoji.
 *
 * Example for stopping the instance from awaiting from further reacts:
 * ```js
 *  (user, instance) => {
 *      // Either
 *      throw 'stopped';
 *
 *      // or
 *      return Promise.reject('stopped');
 *
 *      // will stop the instance from awaiting reacts.
 *      // Passing an error object will emit the `error` event.
 *  };
 *  ```
 */
export interface FunctionEmoji<Element> {
    [emojiNameOrID: string]: (user: User, instance: Embeds | FieldsEmbed<Element>) => any;
}
/**
 * Function to pass to the instance for page indicator formatting.
 *
 * Default:
 * ```js
 *  (page, pages) => `Page ${page} of ${pages}`
 * ```
 */
export declare type PageIndicatorCaster = (page: number, pages: number) => string;
export declare type PageIndicatorPreMadeTypes = 'text' | 'textcompact' | 'circle' | 'hybrid';
