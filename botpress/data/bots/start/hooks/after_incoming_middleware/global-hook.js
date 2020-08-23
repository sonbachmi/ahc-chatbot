  async function hook() {
    if (event.type === 'postback') {
      const payload = event.payload.payload
      switch (payload) {
        case 'product':
          event.state.session.nlu.intent.name = 'buy'
          event.state.temp.intent = 'buy'
          console.log('Intent is buy')
          break
        default:
          console.log('Unexpected payload')
      }
    }
  }

  return hook()