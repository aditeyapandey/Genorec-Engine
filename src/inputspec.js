const { data } = require("jquery");

let GLOBAL_INDEX_DATA = {}

function Dataspec(obj) {
    dataSpec = {}
    dataSpec["sequences"] = [];
    dataSpec["intraSequenceTask"] = (typeof obj.intraSequenceTask =="object") ? obj.intraSequenceTask : (function(){throw "Interconnection should be an object"}());
    dataSpec["denseConnection"] = (typeof obj.denseConnection == "boolean") ?  obj.denseConnection : (function(){throw "Dense Interconnection must be Boolean type"}());
    dataSpec["sparseConnection"] = (typeof obj.sparseConnection == "boolean") ?  obj.sparseConnection : (function(){throw "Sparse Interconnection must be Boolean type"}());
    // dataSpec["sequenceInteractivity"] = (typeof obj.sequenceInteractivity =="object") ? obj.sequenceInteractivity:(function(){throw "Sequence Interactivity should be an object"}() )

    for(let i=0;i<obj.sequences.length;i++)
    {
        let sequence = Sequence(obj.sequences[i])
        // console.log("SEQUENCE",sequence)
        dataSpec["sequences"].push(sequence)
        GLOBAL_INDEX_DATA[sequence['sequenceId']] = sequence
    }
    // console.log("GLOBAL",GLOBAL_INDEX_DATA)
    return dataSpec
}


function Sequence(obj) {
    var sequenceName;
    var features = [];
    var sequenceId;
    let featureIndex = {}

   
    //We can implement a type of checker before assignment of the value    
    sequenceId = (typeof obj.sequenceId == "string") ?  obj.sequenceId : (function(){throw "Sequence Id is missing"}());

    sequenceName = (typeof obj.sequenceName =="string") ?  obj.sequenceName : (function(){throw "Sequence name should be a string"}());
    interFeatureTasks = (typeof obj.interFeatureTasks =="object") ? obj.interFeatureTasks : (function(){throw "Inter feature tasks should be an object"}());
    //Features has to be an array
    for(let i=0;i<obj.features.length;i++){
        let feature = Features(obj.features[i])
        features.push(feature);
        featureIndex[feature['featureId']] = feature
    }
    return {sequenceId,featureIndex,sequenceName,features,interFeatureTasks}
}



function Features(obj){   
    var featureGranularity
    var featureDensity
    var attributes = []
    var featureLabel 
    var featureInterconnection
    var denseInterconnection
    var intraFeatureTasks
    var featureId
    var attributeIndex = {}
    var interactivity  
   
    featureId = (typeof obj.featureId == "string") ?  obj.featureId : (function(){throw "Feature Id is missing"}());
    featureGranularity =  (["point","segment"].indexOf(obj.featureGranularity != -1)) ?  obj.featureGranularity : (function(){throw "Feature Granularity must be either Point or Interval"}());
    featureDensity =  (["sparse","continous"].indexOf(obj.featureDensity) != -1) ?  obj.featureDensity : (function(){throw "Feature Density must be either Sparse or Continous"}());
    featureLabel = obj.featureLabel
    featureInterconnection = (typeof obj.featureInterconnection == "boolean") ?  obj.featureInterconnection : (function(){throw "Feature Interconnection must be Boolean type"}());
    denseInterconnection = (typeof obj.denseInterconnection == "boolean") ? obj.denseInterconnection :  (function(){throw "Dense Interconnection must be Boolean type"}());
    interactivity =   obj.interactivity
    intraFeatureTasks = obj.intraFeatureTasks
    
    for(let i=0;i<obj.attr.length;i++){
        let attribute = Attributes(obj.attr[i])
        attributes.push(attribute)
        attributeIndex[attribute['attrId']] = attribute
    }
    return {featureId,featureGranularity,attributeIndex,featureDensity,featureLabel,interFeatureTasks,featureInterconnection,denseInterconnection,attributes,intraFeatureTasks,interactivity}
}



function Attributes(obj){

    var dataDescriptor
    var dataType
    var intraAttrTask = []
    var interAttrTask = []
    var attrId

    attrId = (typeof obj.attrId == "string") ?  obj.attrId : (function(){throw "Attribute Id is missing"}());
    dataDescriptor =  obj.dataDescriptor; // Allow assignment without typecheck for partial dataspec
    dataType = (typeof obj.dataType == "string" && ["quantitative","categorical","text"].indexOf(obj.dataType) != -1) ?  obj.dataType : (function(){throw "Data Descriptor should be a string and should be either: Quant, Categorical or Text "}());
    intraAttrTask = (Array.isArray(obj.intraAttrTask)) ? obj.intraAttrTask: (function(){throw "Intra attribute tasks should be an array with one or more entries consisting indentify, compare or summarize"}());
    interAttrTask = (Array.isArray(obj.interAttrTask)) ? obj.interAttrTask : [] // Allow assignment of [] without typecheck for partial dataspec
    
    return {attrId,dataDescriptor,dataType,intraAttrTask,interAttrTask}
  
}

module.exports = {
    Dataspec,
    GLOBAL_INDEX_DATA}