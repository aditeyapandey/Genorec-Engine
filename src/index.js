var Dataspec = require('./dataspec.js')
var encodeattribute  = require("./s1_en.js")
var combineattributes  = require("./s2_ca.js")

//Validate the input dataspecification to ensure correctness of input data
const dataspec = new Dataspec(
{
sequences: [
    {   
    sequenceName:"XYZ", 
    sequenceInterconnection:{list:[]},
        features:
        [
            { 
                featureGranularity:"point",
                featureDensity:"sparse",
                featureLabel: "Epigenetic Signal",
                featureInterconnection: false,
                attr:
                [
                    {
                        dataType:"quantitative",
                        intraAttrTask:["identify","compare"]
                    },
                    {
                        dataType:"quantitative",
                        intraAttrTask:["identify"]
                    },
                    {
                        dataType:"text",
                        intraAttrTask:["identify"]
                    }
                ]
            },
            { 
                featureGranularity:"segment",
                featureDensity:"sparse",
                featureLabel: "Gene Annotation",
                featureInterconnection: false,
                attr:
                [{
                    dataType:"categorical",
                    intraAttrTask:["identify","summarize"]
                },
                {
                    dataType:"text",
                    intraAttrTask:["identify"]
                }]
            }
        ]
}]})

var result = dataspec.printConfig()

//First determine sequence level encoding
for (var i=0;i<dataspec.sequences.length;i++){
    //Stage 1: Encoding Selection
    var encodingSpecification = encodeattribute(dataspec.sequences[i]);
    //Stage 2: Combining Attributes
    var combinedEncoding = combineattributes(encodingSpecification)
}
// module.exports ={
// test:result
// }