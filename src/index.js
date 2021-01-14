var Dataspec = require('./inputspec.js')['Dataspec']
var encodeAttribute  = require("./s1_en.js")
var getTracks  = require("./s2_ca.js")
var inputData = require("../configuration/input.json")
var getLayout  = require("./s3_ls.js")
var getAlignment = require("./s4_al.js")
var getArrangment = require("./s5_ar.js")
const cartesian = require("./utils.js").cartesian


//Validate the input dataspecification to ensure correctness of input data
const dataspec = Dataspec(inputData)
const sequenceInputArrays = dataspec["sequences"]
var sequencesOutput = {}

//First determine sequence level encoding
for (var i=0;i<sequenceInputArrays.length;i++){
    currentSequence = sequenceInputArrays[i]
    //Stage 1: Encoding Selection
    var attributeEncoding = encodeAttribute(currentSequence);
    //Stage 2: Combining Attributes
    var tracks = getTracks(attributeEncoding)
    //Stage 3: Predict the Layout
    var layoutForTracks = getLayout(tracks, currentSequence["sequenceId"] )
    //Stage 4: Alignment 
    sequencesOutput[currentSequence['sequenceId']]= getAlignment(layoutForTracks,currentSequence['interFeatureTasks'],currentSequence['sequenceName'],currentSequence['sequenceId'])
    //console.log(attributeEncoding,tracks,layout)
}

//Get view options
var visOptions = []
Object.keys(sequencesOutput).map(val=>{
    let tempVisArray = []
    console.log(val)
    Object.keys(sequencesOutput[val]).map(feature=>{
        console.log(sequencesOutput[val][feature])
        tempVisArray.push(sequencesOutput[val][feature])
    })
    visOptions.push(tempVisArray)
})

var views = cartesian(visOptions)

//Get Arrangement given the entire sequence data
var arrangements;

views.forEach(view=>{
    arrangements = getArrangment(view,dataspec['intraSequenceTask'],dataspec['denseConnection'],dataspec['sparseConnection'])
})


// function setInput(param) {
//     //Validate the input dataspecification to ensure correctness of input data
//     const dataspec = Dataspec(param)
//     //Test output only for 1 sequence
//     var attributeEncoding,tracks,layout

//     // //First determine sequence level encoding
//     for (var i=0;i<dataspec.length;i++){
//         //Stage 1: Encoding Selection
//         var attributeEncoding = encodeAttribute(dataspec[i]);
//         //Stage 2: Combining Attributes
//         var tracks = getTracks(attributeEncoding)
//         //Stage 3: Predict the Layout
//         var layout = getLayout(tracks, attributeEncoding)
//         //Stage 4: Alignment 
//         // var finalSequence = getAlignment(layout)
//     }
//     return {attributeEncoding,tracks,layout}
// }  

// //Define the libary's api for external applications
// module.exports ={
// setInput
// }