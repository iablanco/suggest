import express from 'express'
import fs from 'fs'

const app = express()

app.use(express.json())
app.set('json spaces', 4)


const cake_data = loadJsonData('./datos/torta.json')
const customer_preferences = loadJsonData('./datos/gusto_cliente.json')

//rutas

app.get('/api/sugerencias',(req,res)=>{
    
    try{
        let result = getSuggestions()
        res.json(result)
    }
    catch(err){
        res.status(err.status).json(err)
    }
})


//metodos

function getSuggestions(){        
    let suggestions = getCakesSuggestions()
    return suggestions
}

function getCakesSuggestions(){     
    let sugerencias = cake_data.torta.filter(function(item) {
        if(  comparacionRelleno(item,customer_preferences)
           || comparacionBizcocho(item,customer_preferences) 
           || comparacionCubierta(item, customer_preferences) 
         ){
            return true    
        }
        else {return false}
    }, this
    )
    return sugerencias
} 


function comparacionRelleno(item,customer_preferences){    
    for (const key in customer_preferences.gustos[0].relleno) {
        if (customer_preferences.gustos[0].relleno[key] == true) { 
            
            if(item["relleno"][key] == customer_preferences.gustos[0].relleno[key])
            {
                return true;
            }
        }        
    } 
    return false;
    
}

function comparacionBizcocho(item,customer_preferences){
    for (const key in customer_preferences.gustos[0].bizcocho) {
        if (customer_preferences.gustos[0].bizcocho[key] == true) { 
            if(item["bizcocho"][key] == customer_preferences.gustos[0].bizcocho[key])
            {
                return true;
            }
        }        
    } 
    return false;

}

function comparacionCubierta(item,customer_preferences) {

    for (const key in customer_preferences.gustos[0].cubierta) {
        if (customer_preferences.gustos[0].cubierta[key] == true) { 
            if(item["cubierta"][key] == customer_preferences.gustos[0].cubierta[key])
            {
                return true;
            }
        }
    }
    return false;
}

function loadJsonData(json_path){    
    let json = JSON.parse(fs.readFileSync(json_path, 'utf-8'))  
    return json
}

const puerto = 8088
const server = app.listen(puerto, () => {
    console.log(`servidor inicializado en puerto ${server.address().port}`)
})