function createInputVector(views,network,tasks)
{
    const inputVectorObject = {};
    const inputArray = [];

    //Network
    inputArray.push(inputVectorObject["d_nointerconnection"] = network["connectionType"] ==='none' ? 1:0)
    inputArray.push(inputVectorObject["d_sparseinterconnection"] = network["connectionType"] ==='sparse' ? 1:0)
    inputArray.push(inputVectorObject["d_denseinterconnection"] = network["connectionType"] ==='dense' ? 1:0)

    //Views
    inputArray.push(inputVectorObject["d_twosequences"] = views.length === 2 ? 1:0);
    inputArray.push(inputVectorObject["d_otherthantwosequences"] = views.length !== 2 ? 1:0);


    //layouts
    const allLayouts = views.map(view =>{
        tracks = view["tracks"];
        var layouts=[]
        tracks.map((track,i,arr)=>{
            layouts.push(track["layout"])
         })
         return layouts;
    }).flat()
    const mixedLayout = !allLayouts.every((val,i,arr)=>{
        return val === arr[0];
    })
    const allCircles = allLayouts.every((val,i,arr)=>{
        return val === "circular";
    })
    const allLinear = allLayouts.every((val,i,arr)=>{
        return val === "linear";
    })
    inputArray.push(inputVectorObject["s_circularlayout"] = allCircles ? 1:0);
    inputArray.push(inputVectorObject["s_linearlayout"] = allLinear ? 1:0);
    inputArray.push(inputVectorObject["s_mixedlayout"] = mixedLayout ? 1:0);

    //Tasks
    inputArray.push(inputVectorObject["t_compareacrosstracks"] = tasks.includes("compareMultipleTracks") ? 1:0);

    return{inputVectorObject,inputArray};
}

function getArrangementUpdated(input,networkData,tasks)
{
    const vectorKeys = ["d_nointerconnection","d_sparseinterconnection","d_denseinterconnection","d_twosequences","d_otherthantwosequences","s_circularlayout","s_linearlayout","s_mixedlayout","t_compareacrosstracks"];
    const globalData = require("./modelDataProcessing.js");
    const model = globalData.model5Updated;
    const getProductProperties  = require("./utils.js").productProperties;
    const computeSimilarity = require("./utils.js").computeSimilarity;
    const recommendedProducts = require("./utils.js").recommendedProducts;
    const productVector = getProductProperties(model,vectorKeys);
    const output = [];

    input.forEach(element => {
        const inputVectorObject = createInputVector(element["views"],networkData,tasks);
        const similarityScores = computeSimilarity(inputVectorObject,productVector);
        //console.log("Arrangement All Options",similarityScores);
        // const recommendation = recommendedProducts(similarityScores);
        const recommendation = Object.keys(similarityScores);
        recommendation.forEach(rec=>{
            const viewArrangement = rec;
            const viewArrangementPredictionScore = similarityScores[rec];
            element["viewArrangement"] = viewArrangement;
            element["viewArrangementPredictionScore"] = viewArrangementPredictionScore;
            element["viewConnectionType"] = networkData["connectionType"];
            const views = element["views"];
            const viewPartition = element["viewPartition"];
            const partitionPredictionScore = element["partitionPredictionScore"];
            const finalScore = element["finalScore"] + viewArrangementPredictionScore;
            const tempOutput = {viewPartition,partitionPredictionScore,views,viewArrangement,viewArrangementPredictionScore,viewConnectionType:networkData["connectionType"],finalScore};
            output.push(tempOutput);
        })
    });

    //console.log("Arrangement Recommendations",output);
    return output;
}

module.exports = getArrangementUpdated;