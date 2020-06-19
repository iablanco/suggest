import Suggestion from '../src/suggestion.js'
const data_path= './datos/torta.json'
const customer_preferences_path = './datos/gusto_cliente.json'
   
  
const s = new Suggestion(data_path,customer_preferences_path)
console.log(s.getSuggestions())