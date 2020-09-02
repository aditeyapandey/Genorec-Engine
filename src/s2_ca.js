
// Attributes that can be combined
var attrCombination = {
    "dotplot":["barSaturation","barHue"],
    "barSize":["barSaturation","barHue"],
    "barSaturation":["dotplot","barSize"],
    "barHue":["dotplot","barSize"],
    "areaSize":["areSaturation","areaHue"],
    "areSaturation":["areaSize"],
    "areaHue":["areaSize"]
}

//Superimposable encodings
var superimposition = {
    "dotplot": ["dotplot","lineChart","barSize"],
    "lineChart": ["lineChart","dotplot","barSize"],
    "barSize":["dotplot","lineChart"],
    "barSaturation":["dotplot","lineChart"],
    "barHue":["dotplot","lineChart"]
}

//Description:This function is going to take input specifications and try to output a list of visualizable 
//attributes per feature
//Input: Feature object
//Output: ? 
function getCombinations(feature)
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
    var finalEncodingCombination = []
    for (var x = 0; x< encodingOptions.length; x++){
      var set = encodingOptions[x]  
     finalEncodingCombination.push(combineLogic(set))
    }
   //  console.log(finalEncodingCombination)
    
}

//Description: Checks if two variables can be combined, based on decision rules.
function canCombine(a,b){
    var listOfCombinedAttr = attrCombination[a]

    if(listOfCombinedAttr == undefined) {return false}

    return listOfCombinedAttr.indexOf(b) != -1 ? true : false
}

//Description: This method returns a combined list of attributes
//Input: Array of object containing the attribtue id and encoding recoomendation
//Output: Array of combined and non-combined attributes. E.g [[a1_dotplot,a2_barchart],[a3_annotation]]
function combineLogic(arr)
{
    console.log(arr)
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
                var a = arr[i]
                for (var j = 0;j<arr.length;j++)
                {
                    var b = arr[j]
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
                            finalEncodingCombination.push(`${a['attributeId']}_${a['encoding']}_${b['encoding']}`)
                            combinationNotFound = false
                            break;
                        }
                    }
                }
                if(combinationNotFound)
                {
                    finalEncodingCombination.push(`${a['encoding']}`)
                }
            }
        }

console.log(finalEncodingCombination)
    
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

function combineAttributes(encodingSpecification){
    
    var featureKeys= Object.keys(encodingSpecification)

    // Step 1: For each feature
    for(i=0;i<featureKeys.length;i++){
        var mergedAttributeList = getCombinations(encodingSpecification[featureKeys[i]])
    }
    

}

module.exports = combineAttributes