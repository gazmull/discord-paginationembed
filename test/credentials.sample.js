module.exports = {
  token: null, // Your bot's token
  channel: null, // The channel where to send the embed test
  users: [], // Users authorized to interact with the utility
  test: 'embeds', // 'embeds' or 'fieldsembed' to test
  disabledNavigationEmojis: ['delete'], // 'ALL' / 'BACK' / 'JUMP' / 'FOWARD' / 'DELETE',
  emojisFunctionAfterNavigation: false, // Whether function emojis should be deployed after navigation emojis
  deleteOnTimeout: true // Delete PaginationEmbed message after awaiting response timeout?
};
