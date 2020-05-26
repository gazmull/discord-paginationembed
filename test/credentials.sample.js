module.exports = {
  // Your bot's token
  token: null,
  // The channel where to send the embed test
  channel: null,
  // Users authorized to interact with the utility
  users: [],
  // 'embeds' or 'fieldsembed' to test
  test: 'embeds',
  // 'all' / 'back' / 'jump' / 'foward' / 'delete',
  disabledNavigationEmojis: [ 'delete' ],
  // Whether function emojis should be deployed after navigation emojis
  emojisFunctionAfterNavigation: false,
  // Delete PaginationEmbed message after awaiting response timeout?
  deleteOnTimeout: true
};
