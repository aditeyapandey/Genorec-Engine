function createInputVector(views,network,tasks)
{
    const inputVectorObject = {};
    const inputArray = [];

    //Network
    inputArray.push(inputVectorObject["nointerconnection"] = !network["denseNetwork"] && !network["sparseNetwork"] ? 1:0)
    inputArray.push(inputVectorObject["sparseinterconnection"] = network["sparseNetwork"] ? 1:0)
    inputArray.push(inputVectorObject["denseinterconnection"] = network["denseNetwork"] ? 1:0)

    //Views
    inputArray.push(inputVectorObject["twoviews"] = views.length === 2 ? 1:0);
    inputArray.push(inputVectorObject["otherthantwoviews"] = views.length !== 2 ? 1:0);


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
    inputArray.push(inputVectorObject["allcircles"] = allCircles ? 1:0);
    inputArray.push(inputVectorObject["mixedlayout"] = mixedLayout ? 1:0);

    //Tasks
    inputArray.push(inputVectorObject["compareacrosstracks"] = tasks.includes("compareMultipleTracks") ? 1:0);

    return{inputVectorObject,inputArray};
}

function getArrangementUpdated(input,networkData,tasks)
{
    const vectorKeys = ["nointerconnection","sparseinterconnection","denseinterconnection","twoviews","otherthantwoviews","allcircles","mixedlayout","compareacrosstracks"];
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
        const recommendation = recommendedProducts(similarityScores);
        recommendation.forEach(rec=>{
            const viewArrangement = rec;
            const viewArrangementPredictionScore = similarityScores[rec];
            element["viewArrangement"] = viewArrangement;
            element["viewArrangementPredictionScore"] = viewArrangementPredictionScore;
            output.push(element);
        })
    });

    return output
}

module.exports = getArrangementUpdated;