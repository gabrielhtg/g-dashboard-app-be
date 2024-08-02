export function cleanNik (text: string) {
  const tempArrChar = text.split('')

  for(let i = 0; i < tempArrChar.length; i++) {
    if (tempArrChar[i] == 'l' || tempArrChar[i] == 'L') {
      tempArrChar[i] = '1'
    }

    if (tempArrChar[i] == 'o') {
      tempArrChar[i] = '0'
    }

    if (tempArrChar[i] == '-') {
      tempArrChar[i] = ''
    }
    if (tempArrChar[i] == '=') {
      tempArrChar[i] = ''
    }

  }

  return tempArrChar.join('').trim()
}
