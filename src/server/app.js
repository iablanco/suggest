import express from 'express'
import Suggestion from '../../test/suggestion.js'

function crearApp(){

    const app = crearApp()

    app.use(express.json())
    app.set('json spaces', 4)

    const data_path= './datos/torta.json'
    const customer_preferences_path = './datos/gusto_cliente.json'
    //const tortas = []
    //const gustos = []
    //should be const sug = Suggestion.getInstance(data_path,customer_preferences_path)

    
    app.get('/api/sugerncias', (req, res) => {

        const queryParams = new Map(Object.entries(req.query))       

        try{            
            const sug = Suggestion(data_path,customer_preferences_path)
            let result = sug.getSuggestions()
            res.json(result)

        } catch(err){
            res.status(err.status).json(err)
        }

    }

)

return app

}

export default crearApp