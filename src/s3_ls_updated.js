function createInputVector(spec,tasks,stage1,viewConnectionType)
{
    var inputVectorObject = {};
    var inputArray = [];
    //Network Connections
    const featureInterconnection = spec["tracks"].some( (val) => val["featureInterconnection"]);  
    const denseInterconnection= spec["tracks"].some( (val) => val["denseInterconnection"]);  
    const sparseInterconnection = !denseInterconnection;

    inputArray.push(inputVectorObject["d_viewconnection"] = viewConnectionType !== "none" ? 1:0)
    inputArray.push(inputVectorObject["d_sparseinterconnection"] = sparseInterconnection && featureInterconnection ? 1:0)
    inputArray.push(inputVectorObject["d_denseinterconnection"] = denseInterconnection && featureInterconnection ? 1:0)

    //Tasks
    inputArray.push(inputVectorObject["t_identify"] = 1);
    inputArray.push(inputVectorObject["t_overview"] = tasks.includes("overview") ? 1:0);

    //Encoding
    var channels = spec["tracks"].map(val => {
      return stage1[val['encoding']]['channel']
    })
    inputArray.push(inputVectorObject["s_length"] = (channels.includes("y"))  ? 1 : 0)
    inputArray.push(inputVectorObject["s_color"] = (channels.includes("color(sequential)") || channels.includes("color(nominal)")) ? 1 : 0)
    inputArray.push(inputVectorObject["s_text"] = channels.includes("none")  ? 1 : 0)

    return{inputVectorObject,inputArray};

}


function getLayoutUpdated(visOptions,tasks,viewConnectionType)
{
    const globalData = require("./modelDataProcessing.js");
    const model = globalData.model3Updated;
    const stage1Model = globalData.model1Updated;
    const vectorKeys = ["d_viewconnection","d_sparseinterconnection","d_denseinterconnection","t_identify","t_overview","s_length","s_color","s_text"];
    const getProductProperties  = require("./utils.js").productProperties;
    const computeSimilarity = require("./utils.js").computeSimilarity;
    const recommendedProducts = require("./utils.js").recommendedProducts;
    const productVector = getProductProperties(model,vectorKeys);
    const output = [];


    visOptions.forEach(element => {
        const inputVectorObject = createInputVector(element,tasks,stage1Model,viewConnectionType)
        const similarityScores = computeSimilarity(inputVectorObject,productVector);
        console.log(similarityScores);
        const recommendation = recommendedProducts(similarityScores);

             recommendation.forEach(rec =>{
                 var tempOutput;
                 var tracksTemp = [];
                element["tracks"].forEach(track => { 
                    const layout = rec;
                    const layoutPredictionScore = similarityScores[rec];
                    const fileName = track["fileName"];
                    const encodings = [{"encoding":track["encoding"],"encodingPredictionScore":track["encodingPredictionScore"],"columnName":track["columnName"],"encodingName":track["encodingName"],"granularity":track["granularity"],"availability":track["availability"]}];
                    const interconnection = track["featureInterconnection"]; 
                    const interconnectionType = (()=>{
                        if( !track["featureInterconnection"])
                        {
                            return "none";
                        }
                        else if (track["denseInterconnection"])
                        {
                            return "dense";
                        }
                        else{
                            return "sparse"
                        }
                    })()
                    tracksTemp.push({layout,layoutPredictionScore,fileName,encodings,interconnectionType});
                })
                var tempOutput = {"trackAlignment":element["trackAlignment"],"trackAlignmentPrediction": element["trackAlignmentPrediction"], tracks: tracksTemp};
                output.push(tempOutput)
             })

    });
    
    return output    
}

module.exports = getLayoutUpdated