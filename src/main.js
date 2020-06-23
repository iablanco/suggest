//import Suggestion from './src/suggestion.js'
import crearServidor from './server/app.js'

const puerto = 8081
const app = crearServidor()


const data_path= './datos/torta.json'
const customer_preferences_path = './datos/gusto_cliente.json'

const server = app.listen(puerto, () => {
    console.log(`servidor inicializado en puerto ${server.address().port}`)
})   
  

//const s = new Suggestion(data_path,customer_preferences_path)
//console.log(s.getSuggestions())