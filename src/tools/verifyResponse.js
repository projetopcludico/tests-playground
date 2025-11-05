function verifyResponse(responseItem, correctItem) {
  // checa cada resposta do usuário
  for (const res of responseItem) {
    const correctId = correctItem[res.index]
    if (correctId === undefined || correctId !== res.id) return false
  }
  return true
}

export default verifyResponse
