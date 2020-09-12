const cartesian = require("./utils.js").cartesian

//Superimposable encodings
var superimposition = {
    "dotplot": ["dotplot","linechart","barsize"],
    "linechart": ["linechart","dotplot","barsize"],
    "barsize":["dotplot","linechart"],
}



//Description: Get the alignment of the encoding
//Input: Two or more elements in the array
//Output: stacked or superimposed
function returnAlignmentChoice(input)
{
    //Base case only one encoding
    if(input.length<2){
        return "stacked"
    }

    //First check if all the input elements have samelayout have the same layout
    const allEqual = arr => arr.every( v => v === arr[0] )
    if(!allEqual)
    {
        return "stacked"
    }

    //Check superimposition
}

function getAlignment (stage3Output)
{

    // Get the tracks from each feature
    var tracksPerFeature = []
    Object.keys(stage3Output).map(val=>{
        tracksPerFeature.push(stage3Output[val])
    })

    var possibleCombination = cartesian(tracksPerFeature)
    
    possibleCombination.forEach(val =>{
        console.log(val)
        var alignment = returnAlignmentChoice(val)
    })

}

module.exports = getAlignment