var Dataspec = require('./inputspec.js')['Dataspec']
var encodeAttribute  = require("./s1_en.js")
var getTracks  = require("./s2_ca.js")
// var inputData = require("../TestInput/input.json")
var getLayout  = require("./s3_ls.js")
var getAlignment = require("./s4_al.js")
var getArrangment = require("./s5_ar.js")
// var getViewConfiguration = require("./s6_vc")
const cartesian = require("./utils.js").cartesian
const checkDuplicates = require("./utils.js").checkDuplicates
var RecommendationSpec = require("./outputspec.js")['RecommendationSpec'];
const needDefaultTask = false;
let defaultTasks = ["singleROI","compareMultipleROI","compareMultipleAttributes","multipleFeatures","multipleSequences","explore"];
const testVersion = false;


//Updated variables
var encodeAttributeUpdated  = require("./s1_en_updated.js");
var getAlignmentUpdated  = require("./s2_al_updated.js");
var getLayoutUpdated  = require("./s3_ls_updated.js");
var getPartitionUpdated  = require("./s4_pt_updated.js");
var getArrangementUpdated  = require("./s5_ar_updated.js");


//Local validation of the backend

if(testVersion)
{
    var input = [];
    //Inputs
    input.push({"chart":"Updated Input", "data":require("../TestInput/V2UpdatedInput.json"),"tasks":["explore"]});
    input.push({"chart":"Updated Input", "data":require("../TestInput/V2SingleTrackMultipleView.json"),"tasks":["explore"]});
    input.push({"chart":"Updated Input", "data":require("../TestInput/V2SingleTrackSingleView.json"),"tasks":["explore"]});
    input.push({"chart":"Updated Input", "data":require("../TestInput/V2SingleViewMultiAttrDiffType.json"),"tasks":["explore"]});
    input.push({"chart":"Updated Input", "data":require("../TestInput/V2MatrixTracks.json"),"tasks":["explore"]});
    input.push({"chart":"Updated Input", "data":require("../TestInput/V2CircularConnection.json"),"tasks":["explore"]});
    input.push({"chart":"Updated Input", "data":require("../TestInput/V2MatrixSingleSeq.json"),"tasks":["explore"]});

    input.forEach(val=>{
        getRecommendation(val["data"],val["chart"],val['tasks'])
    })

    //Validate the input dataspecification to ensure correctness of input data
    function getRecommendation(inputData,file,tasks)
    {
        const dataspec = Dataspec(inputData);
        console.log(dataspec);
        const sequenceInputArrays = dataspec["sequences"];
        var sequencesOutput = {};

        //Updated stagewise processing
        const viewGroups = [];
        const tasksUpdated = dataspec.hasOwnProperty('tasks') ? dataspec["tasks"]: [];
        const constraints = true;
        for (var i=0;i<sequenceInputArrays.length;i++)
        {
            currentSequence = sequenceInputArrays[i];
            
            //Stage 1: Encoding Selection
            const attributeEncoding = encodeAttributeUpdated(currentSequence,tasksUpdated);

            //Stage 2: Alignment
            const trackAlignment = getAlignmentUpdated(attributeEncoding);

            //Stage 3: Layout
            const getLayout = getLayoutUpdated(trackAlignment,tasksUpdated,dataspec["connectionType"]);

            //Add View Information
            const viewGroupElement = [];
            getLayout.forEach(val=>{
                val["sequenceName"] = currentSequence["sequenceName"];
                viewGroupElement.push(val);
                })

            viewGroups.push(viewGroupElement);
            }

            //Stage 4: Partition
            const partition = getPartitionUpdated(viewGroups,tasksUpdated,dataspec["connectionType"]);

            //Stage 5: Arrangement
            const arrangement = getArrangementUpdated(partition,{connectionType:dataspec["connectionType"]},tasksUpdated);
        
            arrangement.forEach((val)=>{
                val["geneAnnotation"] = dataspec["geneAnnotation"];
                val["ideogramDisplayed"] = dataspec["ideogramDisplayed"];
            })

        //Return the rec non dupicates
        var recommendationSpecNonDuplicatesUpdated = checkDuplicates(Object.values(arrangement))
        console.log(recommendationSpecNonDuplicatesUpdated);

    }
}
//For publishing npm library
//Testing the node package in CLI: https://egghead.io/lessons/javascript-creating-the-library-and-adding-dependencies
//Using NPM library locally: https://egghead.io/lessons/javascript-test-npm-packages-locally-in-another-project-using-npm-link

if(!testVersion)
{
    function getRecommendation(param) {
    //     //Validate the input dataspecification to ensure correctness of input data
        const dataspec = Dataspec(param);
        const sequenceInputArrays = dataspec["sequences"];
        var sequencesOutput = {};

        //  Updated stagewise processing
        const viewGroups = [];
        const tasksUpdated = dataspec.hasOwnProperty('tasks') ? dataspec["tasks"]: [];
        const constraints = true;
        for (var i=0;i<sequenceInputArrays.length;i++)
        {
            currentSequence = sequenceInputArrays[i];
            
            //Stage 1: Encoding Selection
            const attributeEncoding = encodeAttributeUpdated(currentSequence,tasksUpdated);

            //Stage 2: Alignment
            const trackAlignment = getAlignmentUpdated(attributeEncoding);

            //Stage 3: Layout
            const getLayout = getLayoutUpdated(trackAlignment,tasksUpdated,dataspec["connectionType"]);

            //Add View Information
            const viewGroupElement = [];
            getLayout.forEach(val=>{
                val["sequenceName"] = currentSequence["sequenceName"];
                viewGroupElement.push(val);
                })

            viewGroups.push(viewGroupElement);
            }

            //Stage 4: Partition
            const partition = getPartitionUpdated(viewGroups,tasksUpdated,dataspec["connectionType"]);

            //Stage 5: Arrangement
            const arrangement = getArrangementUpdated(partition,{connectionType:dataspec["connectionType"]},tasksUpdated);
        
            arrangement.forEach((val)=>{
                val["geneAnnotation"] = dataspec["geneAnnotation"];
                val["ideogramDisplayed"] = dataspec["ideogramDisplayed"];
            })
            
        //Return the rec non dupicates
        var recommendationSpecNonDuplicatesUpdated = checkDuplicates(Object.values(arrangement))
        // console.log(recommendationSpecNonDuplicatesUpdated);

        return recommendationSpecNonDuplicatesUpdated;

    }  

    // //Define the libary's api for external applications
    module.exports = {
    getRecommendation
    }
}