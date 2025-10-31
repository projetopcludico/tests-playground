function verifyResponse(responseItem, correctItem) {
    for(let position = 0; position < responseItem.length; position++){
        if(responseItem[position] !== correctItem[position]) return false
    }
    return true;
}

export default verifyResponse