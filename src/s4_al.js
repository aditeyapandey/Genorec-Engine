const cartesian = require("./utils.js").cartesian

//Superimposable encodings
var superimposition = {
    "dotplot": ["dotplot","linechart","barsize","annotation"],
    "linechart": ["linechart","dotplot","barsize","annotation"],
    "barsize":["dotplot","linechart","annotation"],
    "barsaturation":["annotation"],
    "barhue":["annotation"],
    "areahue":["annotation"],
    "areasize":["annotation"],
    "annotation":["dotplot","barsize","barsaturation","areasize","areasaturation","areahue"]
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
function checkForSuperImposition(features)
{
    var featureArray= Object.values(features);
    var cartesianFeatureArray = cartesian(featureArray)
    var cartesianEncodings =  cartesianFeatureArray.map(element=>{
        var encodingArray= element.map(innerElement=>{
            var encodingArrayTemp = innerElement.map(innerInnerElement=>{
                return innerInnerElement['encoding']
            })
          return encodingArrayTemp
        })
        return encodingArray
    })
    var superImposedIndex = encodingSuperImposable(cartesianEncodings)
    return cartesianFeatureArray[superImposedIndex]
}

// //Input: An array of encoding arrays
// //Description: For each subarray crete 
function encodingSuperImposable(cartesianEncodings)
{
    var returnIndex=[];
    var superImpose = false
    for(var k=0;k<cartesianEncodings.length;k++){
        var val = cartesianEncodings[k]
        for(var i=0;i<val.length-1;i++)
        {
            for(var j= i+1;j<val.length;j++)
            {
                if(canSuperimposed(val[i],val[j]))
                {
                    returnIndex.push(k)
                }
       
            }
        }
    }

    if(returnIndex.length>0){
        return returnIndex[0]
    }
    else{
        return returnIndex
    }
}



function getAlignment (layouts,tasks,sequenceName)
{
    // Get the tracks from each feature
    var visOptions = Object.values(layouts)

    visOptions.forEach((vis,i) =>{
        var featureUsed ={}
        var stacked= []
        var superImpose =[]
        Object.keys(vis).map((val) =>{
            featureUsed[val] = false            
        })

        if(tasks.compare.length>0){
            //do something
            var featureList = Object.values(tasks.compare)
            var featureObjectForSuperImposition = {}
            // create an array of tracks in each feature
            featureList.forEach((element)=>{
                if(!featureUsed[element])
                {
                    var valuesToPush = vis[element]["tracks"].map((elemtnVal,trackId) => { 
                        // elemtnVal["encodings"]["trackId"] = trackId
                        return elemtnVal["encodings"]})
            
                    featureObjectForSuperImposition[element]= valuesToPush
                }
            })
            var superImposedFeatures = (checkForSuperImposition(featureObjectForSuperImposition))            
            
            if(superImposedFeatures!=undefined){
            var superImposedFlat = superImposedFeatures.flat()
            superImposedFlat.forEach(element=>{
                var tempString = element["featureId"]+"track_"+element["trackId"]
                if(superImpose.indexOf(tempString)==-1){
                    superImpose.push(tempString)
                    featureUsed[element["featureId"]] = true
                }
            })
         }
        }
        if(tasks.browse.length>0){
            //do something
            var featureList = Object.values(tasks.browse)
            featureList.forEach(element => {
                if(featureUsed[element] == false){
                    featureUsed[element] = true
                    stacked.push(element)
                }
            });
        }
        if(tasks.summarize.length>0){
            //do something
            var featureList = Object.values(tasks.browse)
            featureList.forEach(element => {
                if(featureUsed[element] == false){
                    featureUsed[element] = true
                    stacked.push(element)
                }
            });
        }

        //If no tasks then check for features that can be superimposed
        {
            var featuresForSuperImposition = {}
            Object.keys(vis).map((val)=>{
                if(!featureUsed[val])
                {
                    var valuesToPush = vis[val]["tracks"].map((element,trackId) => { 
                        // elemtnVal["encodings"]["trackId"] = trackId
                        return element["encodings"]})
                        
                    featuresForSuperImposition[val]= valuesToPush
                }
            })   
            if(Object.entries(featuresForSuperImposition).length!=0){
            var superImposedFeatures = (checkForSuperImposition(featuresForSuperImposition))      
            }

            if(superImposedFeatures!=undefined)
            {
            var superImposedFlat = superImposedFeatures.flat()
            superImposedFlat.forEach(element=>{
                var tempString = element["featureId"]+"track_"+element["trackId"]
                if(superImpose.indexOf(tempString)==-1){
                    superImpose.push(tempString)
                    featureUsed[element["featureId"]] = true
                    }
                })
            }
     }

         //Deafult stacking
         {
             
            Object.keys(featureUsed).map(val=>{
                if(!featureUsed[val]){
                    stacked.push(val)
                }
            })
         }


        layouts['vis_'+i]["stacked"] = stacked
        layouts['vis_'+i]["superImposed"] = superImpose
        layouts['vis_'+i]["sequenceName"] =sequenceName
    })
    
    return layouts
}

module.exports = getAlignment