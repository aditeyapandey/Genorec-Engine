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

> {
    "sequences": [
        {   
        "sequenceId":"sequence_0",
        "sequenceName":"XYZ", 
        "interFeatureTasks":{"compare":[],"correlate":[]},
            "features":
            [
                { 
                    "featureId":"feature_0",
                    "featureGranularity":"point",
                    "featureDensity":"sparse",
                    "featureLabel": "Epigenetic Signal",
                    "featureInterconnection": false,
                    "denseInterconnection": false,
                    "intraFeatureTasks":["outliers"],
                    "interactivity":false,
                    "attr":
                    [
                        {
                            "attrId":"attribute_0",
                            "dataType":"quantitative",
                            "intraAttrTask":["identify","compare"]
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