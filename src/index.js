var Dataspec = require('./dataspec.js')
var encodeAttribute  = require("./s1_en.js")
var getTracks  = require("./s2_ca.js")
var inputData = require("../configuration/input.json")
var getLayout  = require("./s3_ls.js")

//Validate the input dataspecification to ensure correctness of input data
const dataspec = new Dataspec(inputData)

var result = dataspec.printConfig()

//First determine sequence level encoding
for (var i=0;i<dataspec.sequences.length;i++){
    //Stage 1: Encoding Selection
    var attributeEncoding = encodeAttribute(dataspec.sequences[i]);
    //Stage 2: Combining Attributes
    var tracks = getTracks(attributeEncoding)
    //Stage 3: Predict the Layout
    var layout = getLayout(tracks, attributeEncoding)
}

//Define the libary's api for external applications
// module.exports ={
// test:result
// }