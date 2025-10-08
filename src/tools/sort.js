function sortObjects(quantidade, arrayObj){
    if(quantidade > arrayObj.length){
        throw new Error('Quantidade não pode ser maior do que o tamanho do array');
    }

    const selecionados = [];
    while(selecionados.length < quantidade) {
        const randomIndex = Math.floor(Math.random() * arrayObj.length);
        const drawn = arrayObj[randomIndex];

        if(selecionados.length < quantidade -1){
            if(selecionados.find(obj => obj.id == drawn.id)){
                continue;
            }
        }        
        selecionados.push(drawn)
    }

    return selecionados;
}

export default sortObjects;
