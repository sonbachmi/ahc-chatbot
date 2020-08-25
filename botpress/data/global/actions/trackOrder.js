const { botId } = event
const message = 'A customer wants to track order they made on Shopee'
bp.notifications.create(botId, { botId, message, level: 'info', redirectUrl: '/modules/hitl' })
