var Dataspec = require('./dataspec.js')
var encodeattribute  = require("./s1_en.js")
var combineattributes  = require("./s2_ca.js")
var inputData = require("../configuration/input.json")

//Validate the input dataspecification to ensure correctness of input data
const dataspec = new Dataspec(inputData)

var result = dataspec.printConfig()

//First determine sequence level encoding
for (var i=0;i<dataspec.sequences.length;i++){
    //Stage 1: Encoding Selection
    var encodingSpecification = encodeattribute(dataspec.sequences[i]);
    //Stage 2: Combining Attributes
    var combinedEncoding = combineattributes(encodingSpecification)
}

//Define the libary's api for external applications
// module.exports ={
// test:result
// }