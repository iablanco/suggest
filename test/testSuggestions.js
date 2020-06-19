import Suggestion from '../src/suggestion.js'

async function testValidateDatosLoaded(suggestions){    
    const customer_preferences_path = './datos/gusto_cliente.json'
    suggestions.customer_preferences = suggestions.loadJsonData(customer_preferences_path)
    let testFailed = false
    let msg = 'testValidateDatosLoaded OK'    
    if(JSON.stringify(suggestions.data) === JSON.stringify({}) )
    {   
        testFailed = true
        msg = 'testValidateDatosLoaded fail'
    }


    return {testFailed, msg}
}

async function testGetSuggestions(suggestions){
    
    const customer_preferences_path = './datos/gusto_cliente.json'
    suggestions.customer_preferences = suggestions.loadJsonData(customer_preferences_path)
    let testFailed = false
    let msg = "testGetSuggestions OK"

    if(JSON.stringify(suggestions.getSuggestions()) === "[]")
    {   
        testFailed = true
        msg = 'testGetSuggestions fail'
    }

    return {testFailed, msg}
}

async function testGetNoneSuggestions(suggestions){
    let pc_false = "./test/datos/gusto_cliente_false.json"
    let testFailed = false
    let msg = "testGetNoneSuggestions OK (suggestions not found)"
    suggestions.customer_preferences = suggestions.loadJsonData(pc_false)    
    let sug = suggestions.getSuggestions()

    if(JSON.stringify(sug) !== "[]")
    {   
        testFailed = true
        msg = 'testGetNoneSuggestions fail (suggestions found)'
    }

    return {testFailed, msg}

}

async function validateLoadPreferencesData(suggestions){

    let testFailed = false
    let msg = "validateLoadPreferencesData OK (Load Preferences Data Ok)"

    try{
        const customer_preferences_path = './datos/torta.json'
        suggestions.customer_preferences = suggestions.loadJsonData(customer_preferences_path)
    } 
    catch(err){
        testFailed = true
        msg = `validateLoadPreferencesData fail (Load Preferences Data error) - ${err.message}`

    }
    finally{

        return { testFailed, msg }

    }    

}

async function valiidateOnlyBizcohoVainillaSuggestion(suggestions){
    let gustos = "./test/datos/gusto_cliente_bizcocho.json"
    suggestions.customer_preferences = suggestions.loadJsonData(gustos)
    let sug = suggestions.getSuggestions()        
    let testFailed = true
    let msg = "valiidateOnlyBizcohoVainillaSuggestion fail"
    for (const iterator of sug) {
        if(iterator.nombre === "Torta frutal")
        {
            testFailed = false
            msg = "valiidateOnlyBizcohoVainillaSuggestion OK"
        }
        
    }    

    return {testFailed, msg}
}



async function main() {
    const data_path= './datos/torta.json'
    const customer_preferences_path = './datos/gusto_cliente.json'
    const suggestions = new Suggestion(data_path,customer_preferences_path)
   
    const tests = [
        testValidateDatosLoaded,
        testGetSuggestions,
        valiidateOnlyBizcohoVainillaSuggestion,
        testGetNoneSuggestions,
        validateLoadPreferencesData
    ]    

    let done = 0
    let errors = 0
    let passed = 0

    console.log('running tests...\n')

    for (let test of tests) {                
        const { testFailed, msg } = await test(suggestions)
        if (testFailed) {
            errors++
            console.log(msg)            
        } else {
            passed++
            console.log(msg)
        }
        done++
    }

    console.log(`done: ${done}`)
    console.log(`passed: ${passed}`)
    console.log(`errors: ${errors}`)
   
}

main()