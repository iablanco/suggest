import fs from 'fs'

export default class Suggestion{

    constructor(data_path,customer_preferences_path) {        
        this.data_path= data_path;
        this.customer_preferences_path = customer_preferences_path;
        this.data = []
        this.customer_preferences = []
        this.loadData()        
    }


getSuggestions(){    
    let suggestions = []
    suggestions = this.getCakesSuggestions(this.customer_preferences, this.data)
    return suggestions
}

getCakesSuggestions(customer_preferences, cake_data){     
    let sugerencias = cake_data.torta.filter(function(item) {
        if(  this.comparacionRelleno(item,customer_preferences)
           || this.comparacionBizcocho(item,customer_preferences) 
           || this.comparacionCubierta(item, customer_preferences) 
         ){
            return true    
        }
        else {return false}
    }, this
    )
    return sugerencias
} 

comparacionRelleno(item,customer_preferences){    
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

comparacionBizcocho(item,customer_preferences){
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

comparacionCubierta(item,customer_preferences) {

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


loadJsonData(json_path){    
    let json = JSON.parse(fs.readFileSync(json_path, 'utf-8'))  
    return json
}

loadData(){
    this.data = this.loadJsonData(this.data_path);
    this.customer_preferences = this.loadJsonData(this.customer_preferences_path);
}

}