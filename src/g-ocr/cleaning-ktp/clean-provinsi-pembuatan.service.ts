export function cleanProvinsiPembuatanService (text) {
  let output : string = ''
  let tempArrChar :string[] = []

  // cleaning provinsi pembuatan
  tempArrChar = text.split('')
  for(let i = 0; i < tempArrChar.length; i++) {
    if (
      tempArrChar[i] == '-' ||
      tempArrChar[i] == '=' ||
      tempArrChar[i] == '‘' ||
      tempArrChar[i] == '"' ||
      tempArrChar[i] == '“' ||
      tempArrChar[i] == '—' ||
      tempArrChar[i] == '_' ||
      tempArrChar[i] == '\'' ||
      tempArrChar[i] == ':' ||
      tempArrChar[i] == ';' ||
      tempArrChar[i] == '~'
    ) {
      tempArrChar[i] = ''
    }

    if (tempArrChar[i] == ']' || tempArrChar[i] == '|') {
      tempArrChar[i] = 'I'
    }
  }

  output = tempArrChar.join('').trim()

  return output
}
