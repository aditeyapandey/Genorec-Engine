function createInputVector(spec,tasks,stage1)
{
    var inputVectorObject = {};
    var inputArray = [];

    //Network Connections
    const featureInterconnection = spec["tracks"].some( (val) => val["featureInterconnection"]);  
    const denseInterconnection= spec["tracks"].some( (val) => val["denseInterconnection"]);  
    const sparseInterconnection = !denseInterconnection;
    inputArray.push(inputVectorObject["denseinterconnection"] = denseInterconnection && featureInterconnection ? 1:0)
    inputArray.push(inputVectorObject["sparseinterconnection"] = sparseInterconnection && featureInterconnection ? 1:0)
   
    //Tasks
    inputArray.push(inputVectorObject["identify"] = 1);
    inputArray.push(inputVectorObject["overview"] = tasks.includes("overview") ? 1:0);

    //Encoding
    var channels = spec["tracks"].map(val => {
      return stage1[val['encoding']]['channel']
    })
    inputArray.push(inputVectorObject["length"] = (channels.includes("y"))  ? 1 : 0)
    inputArray.push(inputVectorObject["color"] = (channels.includes("color(sequential)") || channels.includes("color(nominal)")) ? 1 : 0)
    inputArray.push(inputVectorObject["text"] = channels.includes("none")  ? 1 : 0)

    return{inputVectorObject,inputArray}; 


}


function getLayoutUpdated(visOptions,tasks)
{
    console.log("stage3")
    const globalData = require("./modelDataProcessing.js");
    const model = globalData.model3Updated;
    const stage1Model = globalData.model1
    const vectorKeys = ['sparseinterconnection','denseinterconnection','identify','overview','length','color','text'];
    const getProductProperties  = require("./utils.js").productProperties;
    const computeSimilarity = require("./utils.js").computeSimilarity;
    const recommendedProducts = require("./utils.js").recommendedProducts;
    const productVector = getProductProperties(model,vectorKeys);
    const output = [];


    visOptions.forEach(element => {
        const inputVectorObject = createInputVector(element,tasks,stage1Model)
        const similarityScores = computeSimilarity(inputVectorObject,productVector);
        const recommendation = recommendedProducts(similarityScores);

        // recommendation.forEach(rec =>{
        //         const layout = rec;
        //         const layoutPredictionScore = similarityScores[rec];
        //         // const fileName = track["fileName"];
        //         const encodings = [{"encoding":track["encoding"],"encodingPredictionScore":track["encodingPredictionScore"],"encodingName":track["encodingName"]}];
        //         const encodings = element["tracks"]
        //         // const interconnection = track["featureInterconnection"];
        //         output.push({layout,layoutPredictionScore,fileName,encodings,interconnection})
        //     })

        console.log(element)
        
        element["tracks"].forEach(track => {
            tracksTemp = []
            recommendation.forEach(rec =>{
                const layout = rec;
                const layoutPredictionScore = similarityScores[rec];
                const fileName = track["fileName"];
                const encodings = [{"encoding":track["encoding"],"encodingPredictionScore":track["encodingPredictionScore"],"encodingName":track["encodingName"]}];
                const interconnection = track["featureInterconnection"];
                tracksTemp.push({layout,layoutPredictionScore,fileName,encodings,interconnection})
            })
        })


    });

console.log(output)
    
}

module.exports = getLayoutUpdated