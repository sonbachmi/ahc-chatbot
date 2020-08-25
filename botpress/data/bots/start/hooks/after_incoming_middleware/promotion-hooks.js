  async function hook() {
    let { payload } = event.payload
    if (!payload) return
    payload = payload.toLowerCase()
    if (event.type === 'quick_reply' && payload.startsWith('promotion_')) {
      const promo = payload.substr(8)
      event.state.temp = event.state.session.temp = {
        promo,
        gotoPromo: true
      }
    }
  }
  return hook()