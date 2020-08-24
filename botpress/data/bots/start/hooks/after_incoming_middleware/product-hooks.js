  async function hook() {
    const payload = event.payload.payload.toLowerCase()
    if (event.type === 'postback') {
      switch (payload) {
        case 'product':
          // event.state.session.nlu.intent.name = 'buy'
          event.state.temp = { intent: 'buy2' }
          console.log('Intent is buy')
          break
        default:
          console.log('Unexpected payload')
      }
    } else if (event.type === 'quick_reply' && payload.startsWith('product_')) {
      const product = payload.substr(8)
      event.nlu.intent.name = product
      event.nlu.intent.confidence = 1
      event.state.temp = event.state.session.temp = {
        product,
        productDetails: true
      }
    }
  }

  return hook()