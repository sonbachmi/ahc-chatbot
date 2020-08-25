  async function hook() {
    let { payload } = event.payload
    if (!payload) return
    payload = payload.toLowerCase()
    if (event.type === 'quick_reply' && payload.startsWith('product_')) {
      const product = payload.substr(8)
      event.nlu.intent.name = product
      event.nlu.intent.confidence = 1
      event.state.temp = {
        product,
        productDetails: true
      }
    }
  }
  return hook()