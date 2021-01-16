function getViewConfiguration(interactivity){
    var output =[]
    
    Object.keys(interactivity).forEach(val=>{
        if(interactivity[val].length !== 0){
            output.push(val)
        }
    })

    //There should be only 1 element in the output
    if(output.length>1){
        throw ("Stage 6: View configuration error. We can only support one interaction pattern for the entire view.")
    }
    else{
        return output[0]
    }
}

module.exports = getViewConfiguration