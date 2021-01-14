function Output(obj){
    output = {}

    var sequenceIDs = Object.keys(obj) 

    for(let i=0;i<sequenceIDs.sequences.length;i++)
    {
        output["sequences"].push(Sequence(obj[sequenceIDs[i]]))
    }


}

function Sequence(obj){

}