import { uuid } from './utils/Helpers'
import Supabase from './Supabase'
import BaseRequest from './BaseRequest'

class SupabaseClient {
  constructor(supabaseUrl, supabaseKey, options = {}) {
    this.supabaseUrl = null
    this.supabaseKey = null
    this.restUrl = null
    this.realtimeUrl = null
    this.defaultSchema = 'public'
    this.subscriptions = {}

    this.authenticate(supabaseUrl, supabaseKey)
  }

  authenticate(supabaseUrl, supabaseKey){
    this.supabaseUrl = supabaseUrl
    this.supabaseKey = supabaseKey
    this.restUrl = `${supabaseUrl}/rest/v1`
    this.realtimeUrl = `${supabaseUrl}/realtime/v1`.replace('http', 'ws')
  }

  from(tableName){
    let identifier = uuid()
    
    this.subscriptions[identifier] = new Supabase(
      tableName,
      this.restUrl,
      this.realtimeUrl,
      this.defaultSchema,
      this.supabaseKey,
      identifier
    )
    return this.subscriptions[identifier]
  }

  rpc(functionName, functionParameters = null){
    let path =`${this.restUrl}/rpc/${functionName}?apikey=${this.supabaseKey}`
    let request = new BaseRequest('post', path)

    if(functionParameters != null) request.send(functionParameters)

    return request
  }

  removeSubscription(mySubscription){
    mySubscription.unsubscribe()
    delete this.subscriptions[mySubscription.uuid]
  }
  
}

const createClient = (supabaseUrl, supabaseKey, options = {}) => {
  return new SupabaseClient(supabaseUrl, supabaseKey, options)
}

export { createClient }
