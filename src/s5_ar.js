const cartesian = require("./utils.js").cartesian
const GLOBAL_INDEX_DATA = require('./inputspec.js')['GLOBAL_INDEX_DATA']


function getArrangement(input,tasks,dense,sparse){
    var sequencesCovered = {}
    var output = {"linearStacked":[],"linearOrthogonal":[],"circularStacked":[],"circularAdjacent":[]}
    //console.log(GLOBAL_INDEX_DATA, tasks)

    if(input.length>=3){
        //check layout
        if(input[0]['layout']=="linear"){
         output["linearStacked"] = [...input]
        }
        else{
            output["circleStacked"] = [...input]
        }
    }

    //create a list of all sequences and based on tasks 
    Object.keys(GLOBAL_INDEX_DATA).map((val)=>{
        sequencesCovered[val] = false
    })

    //Stack all sequences that need conservation tasks
    tasks.sequenceConservation.map((val)=>{
        sequencesCovered[val] = true
        output["linearStacked"].push(input[val])
    })

    //Check for all possible 


}

module.exports = getArrangement