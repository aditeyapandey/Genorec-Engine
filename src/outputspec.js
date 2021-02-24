function RecommendationSpec(systemoutput){
    var recommendation = {}

    systemoutput.forEach((element,index) => {
        recommendation["recommendation_"+index] = Arrangement(element.arrangement)
    })
    
    return recommendation
}

// function ViewConfiguration(obj){
//     var recommendationStage = 6;
//     var viewConfig = obj.viewConfig
//     var visDetails = Arrangement(obj.arrangement)

//     return {recommendationStage,viewConfig,visDetails}
// }

function Arrangement(obj){
    var recommendationStage = 5
    var arrangement = obj.arrangementName
    var predictionScore = obj.predictionScore
    var visDetails = {}
    var sequenceInterconnection = obj.sequenceConnection
    var connectionType = obj.typeOfInterconnection

    obj[arrangement].forEach((element,index)=>{
        visDetails["Sequence_"+index] = Sequence(element)
    })

    return {recommendationStage,arrangement,predictionScore,visDetails,sequenceInterconnection,connectionType}
}

function Sequence(obj)
{
    var recommendationStage = 4
    var trackAlignment = obj["stacked"].length == 0 ? "superposed":"stacked"
    var visDetails = {}

    obj[trackAlignment].forEach((element,val) =>{
        visDetails["TrackGroup_"+val] = Tracks(obj[element])
    })
    
    
    return {recommendationStage,trackAlignment,visDetails}
}

function Tracks(obj)
{
    var recommendationStage = 3
    var layout = obj.layoutRecommendation
    var predictionScore = obj.predictionScore
    var visDetails = {}
    var interconnection = obj.interconnection ? true:false

    obj.tracks.forEach((element,val)=>{
        visDetails["Track_"+val] = Groups(element)
    })

    return {recommendationStage,layout,predictionScore,visDetails,interconnection}
}

function Groups(obj)
{
    var recommendationStage =2
    var groupingTechnique
    if(obj.encodings.length==1){
        groupingTechnique = "none"
    }
    else if(obj.encodings.length>1)
    {
        groupingTechnique = obj.encodings[0].combined? "combined":"superposed"
    }
    else
    {
        throw("Grouping information in recommendation spec is wrong")
    }

    var visDetails = {}

    obj.encodings.forEach((element,val)=>{
        visDetails["Attribute_"+val] = Attributes(element)
    })

    return {recommendationStage,groupingTechnique,visDetails}

}

function Attributes(obj)
{
    var recommendationStage = 1;
    var encoding = obj.encoding
    var predictionScore = obj.similarityScore
    return {recommendationStage,encoding,predictionScore}
}

module.exports = {
    RecommendationSpec
}