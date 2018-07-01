const { Client, MessageEmbed } = require('discord.js');
const PaginationEmbed = require('../src/index');

const credentials = require('./credentials');

const bot = new Client();

const error = msg => {
  console.log(msg);

  process.exit(1);
};

bot
  .on('ready', () => {
    const channel = bot.channels.get(credentials.channel);

    if (!channel)
      error('Provided channel is not resolvable by the client.');

    console.log('Ready to test! Channel name:', channel.name, 'Channel ID:', channel.id);

    if (credentials.test === 'embeds') {
      const embeds = [];

      for (let i = 0; i < 5; ++i)
        embeds.push(new MessageEmbed().addField('Page', i + 1));

      new PaginationEmbed.Embeds({
        array: embeds,
        authorizedUsers: credentials.users,
        channel,
        pageIndicator: true,
        title: 'Test Title',
        description: 'Test Description',
        footer: 'Test Footer Text',
        url: 'https://gazmull.github.io/discord-paginationembed',
        color: 0xFF00AE,
        functionEmojis: {
          '⬆': (_, instance) => {
            for (const embed of instance.array)
              embed.fields[0].value++;
          },
          '⬇': (_, instance) => {
            for (const embed of instance.array)
              embed.fields[0].value--;
          }
        }
      })
        .build();
    } else if (credentials.test === 'fieldsembed')
      new PaginationEmbed.FieldsEmbed()
        .setArray([{ name: 'John Doe' }, { name: 'Jane Doe' }])
        .setAuthorizedUsers(credentials.users)
        .setChannel(channel)
        .setElementsPerPage(1)
        .setPage(1)
        .showPageIndicator(false)
        .formatField('Name', i => i.name)
        .setFunctionEmojis({
          '🔄': (user, instance) => {
            const field = instance.fields[0];

            if (field.name === 'Name')
              field.name = user.tag;
            else
              field.name = 'Name';
          }
        })
        .addFunctionEmoji('🅱', (_, instance) => {
          const field = instance.fields[0];

          if (field.name.includes('🅱'))
            field.name = 'Name';
          else
            field.name = 'Na🅱e';
        })
        .setColor(0xFF00AE)
        .setDescription('Test Description')
        .build();
    else error('Invalid pagination mode. Either choose \'embeds\' or \'fieldsembed\'');
  })
  .login(credentials.token);
