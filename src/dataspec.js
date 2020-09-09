 class Dataspec {
    sequences = [];
    constructor(obj){
        for(let i=0;i<obj.sequences.length;i++)
        {
            this.sequences.push(new Sequence(obj.sequences[i]))
        }
    }
    printConfig()
    {
        return this
    }
}

// //Definition of the Sequence Specification 
 class Sequence {
    sequenceName;
    features = [];
    sequenceInterconnection;
    constructor(obj){
    //We can implement a type of checker before assignment of the value    
    this.sequenceName = (typeof obj.sequenceName =="string") ?  obj.sequenceName : (function(){throw "Sequence name should be a string"}());
    this.sequenceInterconnection = (typeof obj.sequenceInterconnection =="object") ? obj.sequenceName : (function(){throw "Interconnection should be an object"}());
    //Features has to be an array
    for(let i=0;i<obj.features.length;i++){
        this.features.push(new Features(obj.features[i]));
    }
    }
}

// //Definition of the Feature Specification 
 class Features{
    featureGranularity
    featureDensity
    attributes = []
    interFeatureTasks = []
    featureLabel 
    featureInterconnection
    denseInterconnection
    constructor(obj){
        this.featureGranularity =  (["point","interval"].indexOf(obj.featureGranularity != -1)) ?  obj.featureGranularity : (function(){throw "Feature Granularity must be either Point or Interval"}());
        this.featureDensity =  (["sparse","continous"].indexOf(obj.featureDensity) != -1) ?  obj.featureDensity : (function(){throw "Feature Density must be either Sparse or Continous"}());
        this.featureLabel = obj.featureLabel
        this.interFeatureTasks = obj.interFeatureTasks
        this.featureInterconnection = (typeof obj.featureInterconnection == "boolean") ?  obj.featureInterconnection : (function(){throw "Feature Interconnection must be Boolean type"}());
        this.denseInterconnection = (typeof obj.denseInterconnection == "boolean") ? obj.denseInterconnection :  (function(){throw "Dense Interconnection must be Boolean type"}());
        for(let i=0;i<obj.attr.length;i++){
        this.attributes.push(new Attributes(obj.attr[i]))
        }    
    }
}

//Definition of the Attribute Specification 
 class Attributes{
    dataDescriptor
    dataType
    intraAttrTask = []
    interAttrTask = []

    constructor(obj)
    {
        this.dataDescriptor =  obj.dataDescriptor; // Allow assignment without typecheck for partial dataspec
        this.dataType = (typeof obj.dataType == "string" && ["quantitative","categorical","text"].indexOf(obj.dataType) != -1) ?  obj.dataType : (function(){throw "Data Descriptor should be a string and should be either: Quant, Categorical or Text "}());
        this.intraAttrTask = (Array.isArray(obj.intraAttrTask)) ? obj.intraAttrTask: (function(){throw "Intra attribute tasks should be an array with one or more entries consisting indentify, compare or summarize"}());
        this.interAttrTask = (Array.isArray(obj.interAttrTask)) ? obj.interAttrTask : [] // Allow assignment of [] without typecheck for partial dataspec
    }
  
}

module.exports = Dataspec