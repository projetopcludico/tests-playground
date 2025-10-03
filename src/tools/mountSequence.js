import sortObjects from "./sort";

function mountSequence(numberItens, timesRepeat, arrayToSort){
    const itenSequence = sortObjects(numberItens, arrayToSort);
    const sequence = [];
    let idSequence = 0;
    for(let count = 0; count < timesRepeat; count++){
        for(let item of itenSequence) {
            idSequence++
            sequence.push({
                id: idSequence,
                object: item
            });
        }
    }
    const correctResponse = { ...sequence[sequence.length -1] };
    sequence[sequence.findIndex(item => item.id == correctResponse.id)].object = { name: '?' }
    return { sequence, correctResponse, itenSequence }
}


export default mountSequence