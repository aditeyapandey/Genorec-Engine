var Dataspec = require('./inputspec.js')['Dataspec']
const checkDuplicates = require("./utils.js").checkDuplicates
const checkMissingAttributes = require("./utils.js").checkMissingAttributes
const createFrequencyTableForScores = require("./utils.js").createFrequencyTableForScores

const coolerOutput = require("./utils.js").coolerOutput
const testVersion = true;


//Updated variables
var encodeAttributeUpdated  = require("./s1_en_updated.js");
var getAlignmentUpdated  = require("./s2_al_updated.js");
var getLayoutUpdated  = require("./s3_ls_updated.js");
var getPartitionUpdated  = require("./s4_pt_updated.js");
var getArrangementUpdated  = require("./s5_ar_updated.js");

//test branch
console.log("Test branch");


//Local validation of the backend

if(testVersion)
{
    var input = [];
    //Inputs
    input.push({"chart":"Updated Input", "data":require("../evalspec/task1.json"),"tasks":["explore"]});
    // input.push({"chart":"Updated Input", "data":require("../evalspec/task3.json"),"tasks":["explore"]});
    // input.push({"chart":"Updated Input", "data":require("../evalspec/task4.json"),"tasks":["explore"]});

    // input.push({"chart":"Updated Input", "data":require("../evalspec/task5.json"),"tasks":["explore"]});
    // input.push({"chart":"Updated Input", "data":require("../evalspec/task6.json"),"tasks":["explore"]});

    //input.push({"chart":"Updated Input", "data":require("../TestInput/bedpe_seg.json"),"tasks":["explore"]});

    //input.push({"chart":"Updated Input", "data":require("../TestInput/V2SingleTrackMultipleView.json"),"tasks":["explore"]});
     //input.push({"chart":"Updated Input", "data":require("../TestInput/V2SingleTrackSingleView.json"),"tasks":["explore"]});
    //input.push({"chart":"Updated Input", "data":require("../TestInput/V2SingleViewMultiAttrDiffType.json"),"tasks":["explore"]});
    // input.push({"chart":"Updated Input", "data":require("../TestInput/V2MatrixTracks.json"),"tasks":["explore"]});
    // input.push({"chart":"Updated Input", "data":require("../TestInput/V2CircularConnection.json"),"tasks":["explore"]});
    // input.push({"chart":"Updated Input", "data":require("../TestInput/V2MatrixSingleSeq.json"),"tasks":["explore"]});
    // input.push({"chart":"Updated Input", "data":require("../TestInput/V2BEDPENetwork.json"),"tasks":["explore"]});
    // input.push({"chart":"Updated Input", "data":require("../TestInput/V2CoolerwithAttr.json"),"tasks":["explore"]});
    // input.push({"chart":"Updated Input", "data":require("../TestInput/V2CoolerTest.json"),"tasks":["explore"]});

    //Special Cooler Input
    //input.push({"chart":"Updated Input", "data":require("../TestInput/V2MatrixNoTracks.json"),"tasks":["explore"]});

    input.forEach(val=>{
        getRecommendation(val["data"],val["chart"],val['tasks'])
    })

    //Validate the input dataspecification to ensure correctness of input data
    function getRecommendation(inputData,file,tasks)
    {
        let attrMissing = checkMissingAttributes(inputData);
        if(attrMissing)
        {
            return coolerOutput;
        }

        const dataspec = Dataspec(inputData);
        console.log(dataspec);
        const sequenceInputArrays = dataspec["sequences"];

        //Updated stagewise processing
        const viewGroups = [];
        const tasksUpdated = dataspec.hasOwnProperty('tasks') ? dataspec["tasks"]: [];

        if (tasksUpdated.length>1) {
            throw 'More than 1 task selection is not allowed';
          }

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
        
            //Adding additional information to the spec
            arrangement.forEach((val)=>{
                val["geneAnnotation"] = dataspec["geneAnnotation"];
                val["ideogramDisplayed"] = dataspec["ideogramDisplayed"];
                val["tasks"] = tasksUpdated.length>0 ? tasksUpdated[0] : "overview"
            })

        //Return the rec non dupicates
        var recommendationSpecNonDuplicatesUpdated = checkDuplicates(Object.values(arrangement))
        console.log(recommendationSpecNonDuplicatesUpdated);
        createFrequencyTableForScores(recommendationSpecNonDuplicatesUpdated)

    }
}
//For publishing npm library
//Testing the node package in CLI: https://egghead.io/lessons/javascript-creating-the-library-and-adding-dependencies
//Using NPM library locally: https://egghead.io/lessons/javascript-test-npm-packages-locally-in-another-project-using-npm-link

if(!testVersion)
{
    function getRecommendation(param) {

        let attrMissing = checkMissingAttributes(param);
        if(attrMissing)
        {
            return coolerOutput

        }

       //Validate the input dataspecification to ensure correctness of input data
        const dataspec = Dataspec(param);
        const sequenceInputArrays = dataspec["sequences"];

        //  Updated stagewise processing
        const viewGroups = [];
        const tasksUpdated = dataspec.hasOwnProperty('tasks') ? dataspec["tasks"]: [];
        if (tasksUpdated.length>1) {
            throw 'More than 1 task selection is not allowed';
          }
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
        
            //Adding additional information to the spec
            arrangement.forEach((val)=>{
                val["geneAnnotation"] = dataspec["geneAnnotation"];
                val["ideogramDisplayed"] = dataspec["ideogramDisplayed"];
                val["tasks"] = tasksUpdated.length>0 ? tasksUpdated[0] : "overview"
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