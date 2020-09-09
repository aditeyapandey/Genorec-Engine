
// Attributes that can be combined
var attrCombination = {
    "dotplot":["barsaturation","barhue"],
    "barsize":["barsaturation","barhue"],
    "barsaturation":["dotplot","barsize"],
    "barhue":["dotplot","barsize"],
    "areasize":["areasaturation","areahue"],
    "areasaturation":["areasize"],
    "areahue":["areasize"]
}

//Superimposable encodings
var superimposition = {
    "dotplot": ["dotplot","linechart","barsize"],
    "linechart": ["linechart","dotplot","barsize"],
    "barsize":["dotplot","linechart"]
}

//Description:This function is going to take input specifications and try to output a list of visualizable 
//attributes per feature
//Input: Feature object
//Output: Returns the tracks 
function getPossibilities(feature)
{
    var allEncoding = []//First store all the possible encodings in the dataspec.

    //Loop through all the options and store the encodings in the allEncoding var
    for (var i=0; i<feature.length;i++)
    {    
        var recommendation = feature[i]['recommendation']
        var encodingRecommendations = []
        for (var j=0; j<recommendation.length; j++){
            var encoding = {'attributeId':feature[i]['attributeId'], 'encoding':recommendation[j]}
            encodingRecommendations.push(encoding)
        }
        allEncoding.push(encodingRecommendations)
    } 

    var encodingOptions = cartesian(allEncoding)

    //Find the attributes that merge
    var finalEncodingCombination = [];
    for (var x = 0; x< encodingOptions.length; x++){
      var set = encodingOptions[x]  
      finalEncodingCombination.push(combineLogic(set))
    }
   
    //Superimpose Attributes
    var finalSuperimposed = []
    for (var x=0;x<finalEncodingCombination.length;x++)
    {
        var set  = finalEncodingCombination[x]
        finalSuperimposed.push(superimposeLogic(set))
    }

    return finalSuperimposed
}

//Description: Checks if two variables can be combined, based on decision rules.
function canCombine(a,b){
    var listOfCombinedAttr = attrCombination[a]
    if(listOfCombinedAttr == undefined) {return false}
    return listOfCombinedAttr.indexOf(b) != -1 ? true : false
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
function superimposeLogic(arr)
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
                    if(canSuperimposed(aEncoding,bEncoding))
                    {
                        visited[j] = 1
                        b.map(arr => {
                            arr["superimposed"] = true
                        })
                        addSuperImposed.push(...b)
                        superImpositionNotFound = false
                        continue
                    }
                }

            }
                a.map(arr => {
                    arr["superimposed"] = !superImpositionNotFound
                })
                addSuperImposed.push(...a)
                

                finalSuperImposed.push(addSuperImposed)
            
        }
    }  
    
    return finalSuperImposed

}


//Description: This method returns a combined list of attributes
//Input: Array of object containing the attribtue id and encoding recoomendation
//Output: Array of combined and non-combined attributes. E.g [[a1_dotplot,a2_barchart],[a3_annotation]]
function combineLogic(arr)
{
    var finalEncodingCombination = []   
    var visited = arr.map(val =>
        {
            return 0
        })
    
    for(var i = 0;i<arr.length;i++)
        {
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
                                // finalEncodingCombination.push(`${a['attributeId']}_${a['encoding']}_${b['encoding']}`)
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


//Description: Test function to evaluate combinations of attributes
//Input: Array of arrays that have to be combined
//Output: All possible combinations of the arrays
function cartesian(args) {
    var r = [], max = args.length-1;
    function helper(arr, i) {
        for (var j=0, l=args[i].length; j<l; j++) {
            var a = arr.slice(0); // clone arr
            a.push(args[i][j]);
            if (i==max)
                r.push(a);
            else
                helper(a, i+1);
        }
    }
    helper([], 0);
    return r;
}

//Description: This function will list all the tasks a user may have requested for in the dataspec at a feature level.
//Input: An entire Feature input
//Output: List of tasks users wants to perform
function getTasks(feature){
    let tasks = new Set()

    for(var i=0;i<feature.length;i++){
        var currentFeature = feature[i];

        if(currentFeature['inputVectorObject']['inputVectorObject']['compare'] == 1)
        {
            tasks.add("compare")
        }
        if(currentFeature['inputVectorObject']['inputVectorObject']['identify'] == 1)
        {
            tasks.add("identify")
        }
        if(currentFeature['inputVectorObject']['inputVectorObject']['summarize'] == 1)
        {
            tasks.add("summarize")
        }
        
    }

    return tasks
}


function getTracks(encodingSpecification){
    
    var featureKeys= Object.keys(encodingSpecification)
    var trackList =[]

    for(i=0;i<featureKeys.length;i++){
        var tasks = getTasks(encodingSpecification[featureKeys[i]])
        var trackPossibilities = getPossibilities(encodingSpecification[featureKeys[i]])
        var featureId = `feature_${i}`
        var returnTrackSpec = {[featureId]:{trackPossibilities,tasks}}
        console.log(`Stage 2 Output`, returnTrackSpec)

        trackList.push(returnTrackSpec)
    }
    
    return trackList

}

module.exports = getTracks