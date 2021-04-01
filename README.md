# Genorec-Engine
Genorec-Engine is a JavaScript library for recommending genomics visualizations.

## NPM 

https://www.npmjs.com/package/genorec-engine

## Prerequisites

Install Node version v 12 or higher.

## Installation

> npm install genorec-engine

If you have a package.json file created in your project, you can also save the library to your package.json file.

> npm install --save genorec-engine

## How to use the library

1. Import the library in your script file

> var genorec = require("genorec-engine")

2. To execute the code and get recommendation spec, you will need to the getRecommendation method and pass it an 'input spec' file.

> var recommendationSpec = genorec.getRecommendation(inputSpec)

## Input Spec

Currently, genorec-engine is designed to work with genorec web application. We recommend you check out the web application for genorec-engine.

https://github.com/aditeyapandey/Genorec-Client

To use genorec-engine independently, you can ues a sample input spec file. 

```javascript

{
    "sequences": [
        {   
        "sequenceId":"sequence_0",
        "sequenceName":"XYZ", 
        "interFeatureTasks":{"compare":[],"correlate":[]},
            "features":
            [
                { 
                    "featureId":"feature_0",
                    "featureGranularity":"segment",
                    "featureDensity":"sparse",
                    "featureLabel": "Random",
                    "featureInterconnection": true,
                    "denseInterconnection": false,
                    "intraFeatureTasks":[],
                    "interactivity":false,
                    "attr":
                    [
                        {
                            "attrId":"attribute_0",
                            "dataType":"categorical",
                            "intraAttrTask":["identify"]
                        },
                        {
                            "attrId":"attribute_1",
                            "dataType":"quantitative",
                            "intraAttrTask":["identify","compare"]
                        },
                        {
                            "attrId":"attribute_2",
                            "dataType":"quantitative",
                            "intraAttrTask":["identify","compare"]
                        }
                    ]
                }
            ]
    }],
    "intraSequenceTask": {"connectedNodes":[],"sequenceConservation":[],"edgeValues":[]},
    "denseConnection": false,
    "sparseConnection": false}
```
## Output Spec

The output recommendation spec of genore-engine contains information about the recommended visualization. 

```javascript
{
  "recommendation_0": {
    "recommendationStage": 5,
    "arrangement": "circularStacked",
    "predictionScore": 0.6666666666666667,
    "visDetails": {
      "Sequence_0": {
        "recommendationStage": 4,
        "trackAlignment": "stacked",
        "visDetails": {
          "TrackGroup_0": {
            "recommendationStage": 3,
            "layout": "circular",
            "predictionScore": 0.16666666666666663,
            "visDetails": {
              "Track_0": {
                "recommendationStage": 2,
                "groupingTechnique": "combined",
                "visDetails": {
                  "Attribute_0": {
                    "recommendationStage": 1,
                    "encoding": "intervalBarchartCN",
                    "predictionScore": 0.6
                  },
                  "Attribute_1": {
                    "recommendationStage": 1,
                    "encoding": "intervalBarchart",
                    "predictionScore": 0.8
                  }
                }
              },
              "Track_1": {
                "recommendationStage": 2,
                "groupingTechnique": "none",
                "visDetails": {
                  "Attribute_0": {
                    "recommendationStage": 1,
                    "encoding": "intervalBarchart",
                    "predictionScore": 0.8
                  }
                }
              }
            },
            "interconnection": true,
            "granularity": "segment",
            "availability": "sparse"
          }
        }
      }
    },
    "sequenceInterconnection": false,
    "connectionType": "sparse"
  },
  "tasks": ["explore"]
}

```