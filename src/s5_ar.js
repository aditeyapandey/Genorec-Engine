const cartesian = require("./utils.js").cartesian


function getArrangement(input){
    var sequenceNames = Object.keys(input)
    var sequenceArray = []

    //Add sequence name as an index to the object
    for(var i = 0;i< sequenceNames.length;i++){
        var visOptions = Object.values(input[sequenceNames[i]])
        sequenceArray.push(visOptions)
    }

    console.log(sequenceArray)

}

module.exports = getArrangement