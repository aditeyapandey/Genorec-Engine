function createInputVector(specs,tasks)
{
    const inputVectorObject = {};
    const inputArray = [];

    //Layout
    let allLayouts = specs.map(view =>{
        if(view.hasOwnProperty("tracks"))
        {
            const layouts= view["tracks"].map(track=>{
                return track["layout"];
             })
        return layouts
        }
        else{
            return []
        }
    });
    allLayouts = allLayouts.flat(1);
    inputArray.push(inputVectorObject["linearlayout"] = allLayouts.includes("linear") ? 1 : 0);
    inputArray.push(inputVectorObject["circularlayout"] = allLayouts.includes("circular") ? 1 : 0);
    
    //Tasks
    inputArray.push(inputVectorObject["overview"] = tasks.includes("overview") ? 1 : 0);
    inputArray.push(inputVectorObject["comparerois"] = tasks.includes('compareMultipleROI') ? 1 : 0);
    
    //Tracks and Views
    inputArray.push(inputVectorObject["multitrack"] = specs.some(val =>{return val["tracks"].length >1})? 1 : 0);
    inputArray.push(inputVectorObject["multiview"] = specs.length >1 ? 1 : 0);
   
    return{inputVectorObject,inputArray};
}

function getPartitionUpdated(input,tasks)
{
    const vectorKeys = ["linearlayout","circularlayout","overview","comparerois","multitrack","multiview"]
    const globalData = require("./modelDataProcessing.js");
    const model = globalData.model4Updated;
    const getProductProperties  = require("./utils.js").productProperties;
    const computeSimilarity = require("./utils.js").computeSimilarity;
    const recommendedProducts = require("./utils.js").recommendedProducts;
    const productVector = getProductProperties(model,vectorKeys);
    const output = [];
    const cartesian = require("./utils.js").cartesian;

    const allVisOptions = cartesian(input);
    allVisOptions.forEach(views =>{
        const inputVectorObject = createInputVector(views,tasks);
        const similarityScores = computeSimilarity(inputVectorObject,productVector);
        const recommendation = recommendedProducts(similarityScores);
        recommendation.forEach(val =>{
            const viewPartition = val;
            const partitionPredictionScore = similarityScores[val];
            output.push({viewPartition,partitionPredictionScore,views});
        })
    })

    return output
}


module.exports = getPartitionUpdated