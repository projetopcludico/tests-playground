const operations = ['+', '-', '*'];

const opertationMap = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b
}

export function useSortOperation(amount, maxOperator) {
    const exportedOperations = [];
    const operators = [];
    for(let i = 0; i < amount; i++) {
        const randomIndex = Math.floor(Math.random() * operations.length);
        const randomOperator = Math.floor(Math.random() * maxOperator) + 1;
        exportedOperations.push(operations[randomIndex]);
        operators.push(randomOperator);
    }

    return {
        exportedOperations,
        operators
    };
}

export function executeOperation(operation, a, b) {
    return opertationMap[operation](a, b);
}