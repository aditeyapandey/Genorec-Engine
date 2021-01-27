var Dataspec = require('./inputspec.js')['Dataspec']
var encodeAttribute  = require("./s1_en.js")
var getTracks  = require("./s2_ca.js")
var inputData = require("../TestInput/input.json")
var getLayout  = require("./s3_ls.js")
var getAlignment = require("./s4_al.js")
var getArrangment = require("./s5_ar.js")
var getViewConfiguration = require("./s6_vc")
const cartesian = require("./utils.js").cartesian
const checkDuplicates = require("./utils.js").checkDuplicates
var RecommendationSpec = require("./outputspec.js")['RecommendationSpec']
var fs = require('fs');


//Local validation of the backend

var input = []
input.push({"chart":"linechart", "data":require("../TestInput/Linechart.json")})
input.push({"chart":"barchart", "data":require("../TestInput/Barcharts.json")})
input.push({"chart":"heatmap", "data":require("../TestInput/Heatmaps.json")})
input.push({"chart":"ideogram", "data":require("../TestInput/Ideogram.json")})
input.push({"chart":"radialideogram", "data":require("../TestInput/IdeogramNonInteractive.json")})
input.push({"chart":"complexchart", "data":require("../TestInput/input.json")})
input.push({"chart":"circos", "data":require("../TestInput/Circos.json")})
input.push({"chart":"gremlin", "data":require("../TestInput/Gremlin.json")})
input.push({"chart":"multisequencemultitrack", "data":require("../TestInput/MultiSequencesMultiTracks.json")})
input.push({"chart":"circularstacked", "data":require("../TestInput/CircularStacked.json")})
input.push({"chart":"linearortho", "data":require("../TestInput/LinearOrtho.json")})


input.forEach(val=>{
    getRecommendation(val["data"],val["chart"])
})

//Validate the input dataspecification to ensure correctness of input data
function getRecommendation(inputData,file)
{
    console.log(file)
    const dataspec = Dataspec(inputData)
    const sequenceInputArrays = dataspec["sequences"]
    var sequencesOutput = {}

    //First determine sequence level encoding
    for (var i=0;i<sequenceInputArrays.length;i++)
    {
        currentSequence = sequenceInputArrays[i]
        //Stage 1: Encoding Selection
        var attributeEncoding = encodeAttribute(currentSequence);
        //Stage 2: Combining Attributes
        var tracks = getTracks(attributeEncoding)
        //Stage 3: Predict the Layout
        var layoutForTracks = getLayout(tracks, currentSequence["sequenceId"] )
        //Stage 4: Alignment 
        sequencesOutput[currentSequence['sequenceId']]= getAlignment(layoutForTracks,currentSequence['interFeatureTasks'],currentSequence['sequenceName'],currentSequence['sequenceId'])
    }

    //Get view options
    var visOptions = []
    Object.keys(sequencesOutput).map(val=>{
        let tempVisArray = []
        Object.keys(sequencesOutput[val]).map(feature=>{
            tempVisArray.push(sequencesOutput[val][feature])
        })
        visOptions.push(tempVisArray)
    })

    var cartesianCombinationsVisOptions = cartesian(visOptions)

    //Stage 5: Get Arrangement given the entire sequence data
    var arrangements = [];

    cartesianCombinationsVisOptions.forEach(option=>{
        arrangements.push(getArrangment(option,dataspec['intraSequenceTask'],dataspec['denseConnection'],dataspec['sparseConnection']))
    })

    //Stage 6: Assign interactivity to the arrangements
    var recommendation = []
    arrangements.forEach((arrangement)=>{
        var viewConfig = getViewConfiguration(dataspec['sequenceInteractivity'])
        recommendation.push({viewConfig,arrangement})
    })

    var recommendationSpec = RecommendationSpec(recommendation)

    var recommendationSpecNonDuplicates = checkDuplicates(Object.values(recommendationSpec))

    console.log(recommendationSpecNonDuplicates)

    // var json = JSON.stringify(recommendationSpecNonDuplicates);
    // fs.writeFile('RecommendedSpec/'+file+'.json', json, (err) => {
    //     if (err) throw err;
    //     console.log('Data written to file');
    // });

}

//For publishing npm library
//Using NPM library locally: https://egghead.io/lessons/javascript-test-npm-packages-locally-in-another-project-using-npm-link

//  function getRecommendation(param) {
// //     //Validate the input dataspecification to ensure correctness of input data
//     const dataspec = Dataspec(param)
//     const sequenceInputArrays = dataspec["sequences"]
//     var sequencesOutput = {}

//     //First determine sequence level encoding
//     for (var i=0;i<sequenceInputArrays.length;i++)
//     {
//         currentSequence = sequenceInputArrays[i]
//         //Stage 1: Encoding Selection
//         var attributeEncoding = encodeAttribute(currentSequence);
//         //Stage 2: Combining Attributes
//         var tracks = getTracks(attributeEncoding)
//         //Stage 3: Predict the Layout
//         var layoutForTracks = getLayout(tracks, currentSequence["sequenceId"] )
//         //Stage 4: Alignment 
//         sequencesOutput[currentSequence['sequenceId']]= getAlignment(layoutForTracks,currentSequence['interFeatureTasks'],currentSequence['sequenceName'],currentSequence['sequenceId'])
//     }

//     //Get view options
//     var visOptions = []
//     Object.keys(sequencesOutput).map(val=>{
//         let tempVisArray = []
//         Object.keys(sequencesOutput[val]).map(feature=>{
//             tempVisArray.push(sequencesOutput[val][feature])
//         })
//         visOptions.push(tempVisArray)
//     })

//     var cartesianCombinationsVisOptions = cartesian(visOptions)

//     //Stage 5: Get Arrangement given the entire sequence data
//     var arrangements = [];

//     cartesianCombinationsVisOptions.forEach(option=>{
//         arrangements.push(getArrangment(option,dataspec['intraSequenceTask'],dataspec['denseConnection'],dataspec['sparseConnection']))
//     })

//     //Stage 6: Assign interactivity to the arrangements
//     var recommendation = []
//     arrangements.forEach((arrangement)=>{
//         var viewConfig = getViewConfiguration(dataspec['sequenceInteractivity'])
//         recommendation.push({viewConfig,arrangement})
//     })

//     var recommendationSpec = RecommendationSpec(recommendation)
//     console.log(recommendationSpec)
//     return recommendationSpec

// }  

// // //Define the libary's api for external applications
// module.exports ={
// getRecommendation
// }