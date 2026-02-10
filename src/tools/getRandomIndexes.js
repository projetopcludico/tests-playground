function getRandomIndexes(max, count) {
    const indexes = new Set();
    while (indexes.size < count) {
        const index = Math.floor(Math.random() * max);
        if(index === 0) {
            continue;
        }

        indexes.add(index);
    }
    return Array.from(indexes);
}

export default getRandomIndexes