const globalData = require("./modelDataProcessing.js")
const cartesian = require("./utils.js").cartesian


var attrCombination = {
    "barchart":["heatmap","barchartCN"],
    "heatmap":["barchart","dotplot"],
    "barchartCN":["barchart","dotplot"],
    "dotplot":["heatmap","barChartCN"],
    "intervalBarchart":["intervalHeatmap","intervalBarchartCN"],
    "intervalHeatmap":["intervalBarchart"],
    "intervalBarchartCN":["intervalBarchart"]
}


var superimposition = {
    "dotplot": ["dotplot","linechart"],
    "linechart": ["linechart","dotplot"]
}


//Description:This function is going to take input specifications and try to output a list of visualizable attributes per feature
//Input: Feature object
//Output: Returns the tracks 
function getPossibilities(feature)
{
    var allEncoding = []//First store all the possible encodings in the dataspec.

    //Step 1: Identify all the possible encodings for the attributes
    //Loop through all the options and store the encodings in the allEncoding var
    for (var i=0; i<feature.length;i++)
    {    
        var recommendation = feature[i]['recommendation']
        var similarityScore = recommendation.map((val)=>{return feature[i]['similarityScore'][val]})
        var encodingRecommendations = []
        for (var j=0; j<recommendation.length; j++){
            var encoding = {'featureId':feature[i]["featureId"],'attributeId':feature[i]['attributeId'], 'encoding':recommendation[j], 'similarityScore':similarityScore[j]}
            encodingRecommendations.push(encoding)
        }
        allEncoding.push(encodingRecommendations)
    } 

    var encodingOptions = cartesian(allEncoding)
    
    //Find the attributes that merge
    var finalEncodingCombination = [];
    for (var x = 0; x< encodingOptions.length; x++)
    {
      var set = encodingOptions[x]  
      finalEncodingCombination.push(combineLogic(set))
    }
    // console.log("combinations",finalEncodingCombination)
    
    //Superimpose Attributes
    var finalSuperimposed = []
    for (var x=0;x<finalEncodingCombination.length;x++)
    {
        var set  = finalEncodingCombination[x]
        finalSuperimposed.push(superimposeLogic(set,x))
    }

    var trackIdAdded = addTrackId(finalSuperimposed)

    return finalSuperimposed
}

function addTrackId(tracks)
{
   var trackIdAdded = tracks.map(element => {
        var trackIdArray = element.map((innerElement,trackId) => {
            var innterTid =  innerElement.map(innerInner => {
                    innerInner['trackId'] = trackId
                    return innerInner
            })
            return innterTid
        });
        return trackIdArray
    });
    return trackIdAdded
}




//Description: Checks if two variables can be combined. To check there will be two steps, first we will cont.
//ensure that two attributes can logically be combined and next we test whether based on tasks it makes sense to combine
//then test if the combination will work.
function canCombine(a,b){
    var listOfCombinedAttr = attrCombination[a]
    if(listOfCombinedAttr == undefined) {return false}
    let possibleCombination = listOfCombinedAttr.indexOf(b) != -1 ? true : false
    return possibleCombination
}

//Description: This method returns a combined list of attributes
//Input: Array of object containing the attribtue id and encoding recoomendation
//Output: Array of combined and non-combined attributes. E.g [[a1_dotplot,a2_barchart],[a3_annotation]]
function combineLogic(arr)
{
    var finalEncodingCombination = []   
    
    //Create an array to keep track of all the attributes that have been combined
    var visited = arr.map(val =>
        {
            return 0
        })
    
    //Loop through all the options in the arr to check for pairs that can be combined    
    for(var i = 0;i<arr.length;i++)
        {
            //Only check if the attribute has not been combined at a previous stage
            if(visited[i]==0)
            {
                var combinationNotFound = true // This variable will keep track incase the combination was found 
                var a = Object.assign({},arr[i])
                for (var j = 0;j<arr.length;j++)
                {
                    if(visited[j]==0)
                    {
                        var b = Object.assign({},arr[j])
                        if(a['attributeId'] == b['attributeId'])
                        {
                            continue
                        }
                        else
                        {
                            var combine = canCombine(a['encoding'],b['encoding'])                            
                            if (combine)
                            {
                                visited[i] = 1
                                visited[j] = 1
                                a['combined'] = true
                                b['combined'] = true
                                finalEncodingCombination.push([a,b])
                                combinationNotFound = false
                                break;
                            }
                        }
                    }
                }
                if(combinationNotFound)
                {
                    a['combined'] = false
                    finalEncodingCombination.push([a])
                }
            }
        }

return finalEncodingCombination
}

//Description: Check if two items groups/individual atttributes can be superimposed
//Input Both a and b are array and we will do a cartesian combination and check 
function canSuperimposed(a,b){
    var canSuperimposed = []
    var allcombinations = cartesian([a,b])

    for(var i=0;i<allcombinations.length;i++){
        var a = allcombinations[i][0]
        var b = allcombinations[i][1]
        if(superimposition[a] == undefined || superimposition[a] == undefined){
            canSuperimposed.push(false)
            continue
        }
        superimposition[a].indexOf(b) != -1 ? canSuperimposed.push(true) : canSuperimposed.push(false) // Incorrect
    }

    // console.log("boolean array", canSuperimposed) 
     return canSuperimposed.every(v => v === true)

}



//Description: Algorithm to superimpose
function superimposeLogic(arr,index)
{
    var finalSuperImposed = []
    var visited = arr.map(val =>
        {
            return 0
        })
    
    for(var i=0;i<arr.length;i++)
    {
        if(visited[i]==0)
        {
            var superImpositionNotFound = true
            var a = arr[i]
            var addSuperImposed = []
            var aEncoding = arr[i].map(val => {return val['encoding']})

            for(var j=0;j<arr.length;j++)
            {
                if(visited[j]==0)
                {
                    if(i==j){continue} // Skip the same 
                    var b = arr[j]
                    var bEncoding = arr[j].map(val => {return val['encoding']})
                    // console.log(aEncoding,bEncoding)
                    // console.log(canSuperimposed(aEncoding,bEncoding))
                    if(canSuperimposed(aEncoding,bEncoding))
                    {
                        visited[j] = 1
                        b.map(arr => {
                            arr["superimposed"] = true
                        })
                        addSuperImposed.push(...b)
                        aEncoding.push(...bEncoding)//new
                        superImpositionNotFound = false
                        continue
                    }
                }

            }
                visited[i] = 1//new
                a.map(arr => {
                    arr["superimposed"] = !superImpositionNotFound
                })
                addSuperImposed.push(...a)
            
                finalSuperImposed.push(addSuperImposed)
            
        }
    }  
    return finalSuperImposed
}

function getTracks(encodingSpecification){
    
    var featureKeys= Object.keys(encodingSpecification)
    var trackList =[]

    for(i=0;i<featureKeys.length;i++){
        var trackPossibilities = getPossibilities(encodingSpecification[featureKeys[i]])
        var featureId = `feature_${i}`
        var returnTrackSpec = {[featureId]:{trackPossibilities}}
        trackList.push(returnTrackSpec)
    }

    // console.log(trackList)
    return trackList

}

module.exports = getTracks