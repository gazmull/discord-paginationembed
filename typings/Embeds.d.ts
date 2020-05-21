import { ColorResolvable, EmbedField, EmbedFieldData, FileOptions, MessageAttachment, MessageEmbed, StringResolvable } from 'discord.js';
import { PaginationEmbed } from './base';
/**
 * A pagination mode that uses an array of MessageEmbed to paginate.
 * @extends [[PaginationEmbed]]
 * @noInheritDoc
 */
export declare class Embeds extends PaginationEmbed<MessageEmbed> {
    /** The title of all embeds. */
    title: string;
    /** The description of all embeds. */
    description: string;
    /** The URL of all embeds. */
    url: string;
    /** The color of all embeds. */
    color: number;
    /** The timestamp of all embeds. */
    timestamp: number;
    /** The fields of all embeds. */
    fields: EmbedField[];
    /** The thumbnail of all embeds. */
    thumbnail: string;
    /** The image of all embeds. */
    image: string;
    /** The author of all embeds. */
    author: {
        name: string;
        url?: string;
        iconURL?: string;
    };
    /** The footer of all embeds. */
    footer: {
        text: string;
        iconURL?: string;
    };
    /** Embed in the current page. */
    get currentEmbed(): MessageEmbed;
    /**
     * Adds a field to the fields of all embeds.
     * @param name - The name of the field.
     * @param value - The value of the field.
     * @param inline - Whether the field is inline to the other fields.
     */
    addField(name: string, value: StringResolvable, inline?: boolean): this;
    addFields(...fields: EmbedFieldData[] | EmbedFieldData[][]): void;
    /**
     * Files to attach to all embeds.
     * @param files - Files to attach.
     */
    attachFiles(files: (FileOptions | string | MessageAttachment)[]): this;
    /**
     * Build the Pagination Embeds.
     *
     * ### Example
     * ```js
     *   const { Embeds } = require('discord-paginationembed');
     *   const { MessageEmbed } = require('discord.js');
     *
     *   // Under message event.
     *   const embeds = [];
     *
     *   for (let i = 0; i < 5; ++i)
     *    embeds.push(new MessageEmbed().addField('Page', i + 1));
     *
     *   new Embeds()
     *    .setAuthorizedUsers([message.author.id])
     *    .setChannel(message.channel)
     *    .setClientAssets({ prompt: 'Yo {{user}} wat peige?!?!?' })
     *    .setArray(embeds)
     *    .setPageIndicator(false)
     *    .setPage(1)
     *    .setTimeout(69000)
     *    .setNavigationEmojis({
     *      back: '◀',
     *      jump: '↗',
     *      forward: '▶',
     *      delete: '🗑'
     *    })
     *    .setFunctionEmojis({
     *      '⬆': (_, instance) => {
     *        for (const embed of instance.array)
     *          embed.fields[0].value++;
     *        },
     *      '⬇': (_, instance) => {
     *         for (const embed of instance.array)
     *           embed.fields[0].value--;
     *        }
     *    })
     *    .setDescription('This is one of my embeds with this message!')
     *    .setColor(0xFF00AE)
     *    .setTimestamp()
     *    .build();```
     */
    build(): Promise<void>;
    /**
     * Sets the array of MessageEmbed to paginate.
     * @param array - An array of MessageEmbed to paginate.
     */
    setArray(array: MessageEmbed[]): this;
    /**
     * Set the author of all embeds.
     * @param name - The name of the author.
     * @param iconURL - The icon URL of the author.
     * @param url - The URL of the author.
     */
    setAuthor(name: string, iconURL?: string, url?: string): this;
    /**
     * Sets the color of all embeds.
     * @param color - The color of all embeds.
     */
    setColor(color: ColorResolvable): this;
    /**
     * Sets the description of all embeds.
     * @param description - The description of all embeds.
     */
    setDescription(description: StringResolvable): this;
    /**
     * Sets the footer of all embeds.
     * @param text - The footer text.
     * @param iconURL - URL for the footer's icon.
     */
    setFooter(text: StringResolvable, iconURL?: string): this;
    /**
     * Sets the image of all embeds.
     * @param url - The image of all embeds.
     */
    setImage(url: string): this;
    /**
     * Sets the thumbnail of all embeds.
     * @param url - The thumbnail of all embeds.
     */
    setThumbnail(url: string): this;
    /**
     * Sets the timestamp of all embeds.
     * @param timestamp - The timestamp or date.
     */
    setTimestamp(timestamp?: Date | number): this;
    /**
     * Sets the title of all embeds.
     * @param title - The title of all embeds.
     */
    setTitle(title: StringResolvable): this;
    /**
     * Sets the URL of all embeds.
     * @param url - The URL of all embeds.
     */
    setURL(url: string): this;
    /**
     * Removes, replaces, and inserts fields in all embeds (max 25).
     * @param index - The index to start at.
     * @param deleteCount - The number of fields to remove.
     * @param name - The name of the field.
     * @param value - The value of the field.
     * @param inline - Set the field to display inline.
     */
    spliceFields(index: number, deleteCount: number, name?: StringResolvable, value?: StringResolvable, inline?: boolean): this;
    /** @ignore */
    _loadList(callNavigation?: boolean): Promise<void>;
}
