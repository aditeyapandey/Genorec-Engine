function Dataspec(obj) {
    sequences = [];
  
    for(let i=0;i<obj.sequences.length;i++)
    {
        sequences.push(Sequence(obj.sequences[i]))
    }

    return sequences

}


function Sequence(obj) {
    var sequenceName;
    var features = [];
    var sequenceInterconnection;
   
    //We can implement a type of checker before assignment of the value    
    sequenceName = (typeof obj.sequenceName =="string") ?  obj.sequenceName : (function(){throw "Sequence name should be a string"}());
    sequenceInterconnection = (typeof obj.sequenceInterconnection =="object") ? obj.sequenceName : (function(){throw "Interconnection should be an object"}());
    interFeatureTasks = (typeof obj.interFeatureTasks =="object") ? obj.interFeatureTasks : (function(){throw "Inter feature tasks should be an object"}());
    //Features has to be an array
    for(let i=0;i<obj.features.length;i++){
        features.push(Features(obj.features[i]));
    }

    return {sequenceName,features,sequenceInterconnection,interFeatureTasks}
}



function Features(obj){
    var featureGranularity
    var featureDensity
    var attributes = []
    var interFeatureTasks = []
    var featureLabel 
    var featureInterconnection
    var denseInterconnection
   
    featureGranularity =  (["point","interval"].indexOf(obj.featureGranularity != -1)) ?  obj.featureGranularity : (function(){throw "Feature Granularity must be either Point or Interval"}());
    featureDensity =  (["sparse","continous"].indexOf(obj.featureDensity) != -1) ?  obj.featureDensity : (function(){throw "Feature Density must be either Sparse or Continous"}());
    featureLabel = obj.featureLabel
    interFeatureTasks = obj.interFeatureTasks
    featureInterconnection = (typeof obj.featureInterconnection == "boolean") ?  obj.featureInterconnection : (function(){throw "Feature Interconnection must be Boolean type"}());
    denseInterconnection = (typeof obj.denseInterconnection == "boolean") ? obj.denseInterconnection :  (function(){throw "Dense Interconnection must be Boolean type"}());
    for(let i=0;i<obj.attr.length;i++){
        attributes.push(Attributes(obj.attr[i]))   
    }
    return {featureGranularity,featureDensity,featureLabel,interFeatureTasks,featureInterconnection,denseInterconnection,attributes}
}



function Attributes(obj){
    var dataDescriptor
    var dataType
    var intraAttrTask = []
    var interAttrTask = []


    dataDescriptor =  obj.dataDescriptor; // Allow assignment without typecheck for partial dataspec
    dataType = (typeof obj.dataType == "string" && ["quantitative","categorical","text"].indexOf(obj.dataType) != -1) ?  obj.dataType : (function(){throw "Data Descriptor should be a string and should be either: Quant, Categorical or Text "}());
    intraAttrTask = (Array.isArray(obj.intraAttrTask)) ? obj.intraAttrTask: (function(){throw "Intra attribute tasks should be an array with one or more entries consisting indentify, compare or summarize"}());
    interAttrTask = (Array.isArray(obj.interAttrTask)) ? obj.interAttrTask : [] // Allow assignment of [] without typecheck for partial dataspec
    
    return {dataDescriptor,dataType,intraAttrTask,interAttrTask}
  
}

module.exports = Dataspec