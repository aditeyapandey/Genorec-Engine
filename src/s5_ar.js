const cartesian = require("./utils.js").cartesian

function checkOrthogonal(seq1,seq2){
    //console.log(seq1,seq2)
}

function getArrangement(input,task){
    var sequenceNames = Object.keys(input)
    var sequenceArray = []

    //Add sequence name as an index to the object
    for(var i = 0;i< sequenceNames.length;i++){
        var visArray = Object.values(input[sequenceNames[i]])
        sequenceArray.push(visArray)
    }

    // Array that represents the number of unique options
    var visOptions = cartesian(sequenceArray)
    //For each option, we have to identify if the sequences can be orthogonally combined
    visOptions.forEach((array,index)=>{
        for(var i =0;i<array.length-1;i++)
        {
            var sequence1 = array[i]
            for (var j=i+1;j<array.length;j++){
                var sequence2 = array[j]
                if(task['correlate'].indexOf(sequence1['sequenceName']) != -1 && task['correlate'].indexOf(sequence2['sequenceName']) !=-1 ){
                    checkOrthogonal(sequence1,sequence2)
                }
            }
        }
    })

}

module.exports = getArrangement