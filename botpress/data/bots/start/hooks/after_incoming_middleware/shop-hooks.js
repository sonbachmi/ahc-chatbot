  async function hook() {
    let payload = event.payload.payload
    if (!payload) return
    payload = payload.toLowerCase()
    if (event.type === 'quick_reply' && payload.startsWith('shop_')) {
      const shop = payload.substr(5)
      event.nlu.intent.name = shop
      event.nlu.intent.confidence = 1
      event.state.temp = event.state.session.temp = {
        shop,
        gotoShop: true
      }
    }
  }

  return hook()