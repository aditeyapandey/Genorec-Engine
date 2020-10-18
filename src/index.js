var Dataspec = require('./dataspec.js')
var encodeAttribute  = require("./s1_en.js")
var getTracks  = require("./s2_ca.js")
var inputData = require("../configuration/input.json")
var getLayout  = require("./s3_ls.js")
var getAlignment = require("./s4_al.js")
var getArrangment = require("./s5_ar.js")

//Validate the input dataspecification to ensure correctness of input data
const dataspec = Dataspec(inputData)
const sequenceInputArrays = dataspec["sequences"]
var sequencesOutput = {}


// //First determine sequence level encoding
for (var i=0;i<sequenceInputArrays.length;i++){
    //Stage 1: Encoding Selection
    var attributeEncoding = encodeAttribute(sequenceInputArrays[i]);
    //Stage 2: Combining Attributes
    var tracks = getTracks(attributeEncoding)
    //Stage 3: Predict the Layout
    var layout = getLayout(tracks, attributeEncoding)
    //Stage 4: Alignment 
    sequencesOutput[sequenceInputArrays[i]['sequenceName']]= getAlignment(layout,sequenceInputArrays[i]['interFeatureTasks'],sequenceInputArrays[i]['sequenceName'])
    //console.log(attributeEncoding,tracks,layout)
}

//Get Arrangement given the entire sequence data
var arrangements = getArrangment(sequencesOutput)


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