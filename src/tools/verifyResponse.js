function verifyResponse(responseList, correctList) {
  for (const { index, id } of responseList) {
    if (correctList[index] !== id) return false
  }
  return true
}

export default verifyResponse