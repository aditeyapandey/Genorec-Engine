# Genorec-Engine
This is the recommendation engine for genomics visualization recommendation tool.

## NPM 

https://www.npmjs.com/package/genorec-engine

## Prerequisites

Install Node version v 12 or higher.

## Installation of library in your project

> npm install genorec-engine

If you have a package.json file created in your project, you can also save the library to your package.json file.

> npm install --save genorec-engine

## How to import the library in your JavaScript project and use it

1. Import the library in your script file

> var genorec = require("genorec-engine")

2. To execute the code and get recommendation spec, you will need to the getRecommendation method and pass it an 'input spec' file.

> var recommendationSpec = genorec.getRecommendation(inputSpec)

## Input Spec

