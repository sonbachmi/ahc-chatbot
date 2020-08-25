  /**
   * Small description of your action
   * @title The title displayed in the flow editor
   * @category Custom
   * @author Your_Name
   * @param {string} name - An example string variable
   * @param {any} value - Another Example value
   */
  const trackOrder = async (name, value) => {
    const { botId } = event
    const message = 'A customer wants to track order they made on ' + (name || 'a shop')
    bp.notifications.create(botId, { botId, message, level: 'info' })
  }

  return trackOrder(args.name, args.value)