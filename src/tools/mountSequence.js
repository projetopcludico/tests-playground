import sortObjects from "./sort";

function useMountSequence(numberItens, timesRepeat, numberDiscover, arrayToSort) {
  const itenSequence = sortObjects(numberItens, arrayToSort);
  const sequence = [];
  let idSequence = 0;

  // monta a sequência completa
  for (let count = 0; count < timesRepeat / itenSequence.length; count++) {
    for (let item of itenSequence) {
      idSequence++;
      sequence.push({
        id: idSequence,
        object: { ...item },
      });
    }
  }

  const discoverCount = Math.min(numberDiscover, sequence.length);

  const randomIndexes = getRandomIndexes(sequence.length, discoverCount).sort((a, b) => a - b);

  const correctResponses = [];

  for (const index of randomIndexes) {
    const chosen = sequence[index];
    correctResponses.push(chosen.object.id);

    sequence[index].object.icon = "mdi mdi-help-box";
    sequence[index].object.name = "discover";
  }

  const options = shuffle(itenSequence);
  const finalChoices = [...new Set(options)];

  return { sequence, correctResponses, finalChoices };
}

function getRandomIndexes(max, count) {
  const indexes = new Set();
  while (indexes.size < count) {
    indexes.add(Math.floor(Math.random() * max));
  }
  return Array.from(indexes);
}

// embaralha array das respostas
function shuffle(optionsArray) {
  const list = [...optionsArray];
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
}

export default useMountSequence;
