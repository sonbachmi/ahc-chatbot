  async function hook() {
    let { payload } = event.payload
    if (!payload) return
    payload = payload.toLowerCase()
    if (event.type === 'postback' && payload.startsWith('pmenu_')) {
      event.state.temp = event.state.session.temp = {
        goto: payload.substr(4)
      }
    }
  }

  return hook()