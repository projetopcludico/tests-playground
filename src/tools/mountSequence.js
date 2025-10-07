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
                object: { ...item }
            });
        }
    }
    const randomIndex = Math.floor(Math.random() * sequence.length);
    const correctResponse = {
        id: sequence[randomIndex].id,
        object: { ...sequence[randomIndex].object }
    };
    sequence[randomIndex].object.icon = 'mdi mdi-help-box'
    sequence[randomIndex].object.name = 'discover'
    const options = shuffle(itenSequence)
    return { sequence, correctResponse, options }
}

function shuffle(optionsArray) {
  const list = [...optionsArray];
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
}

export default mountSequence