export function cleanPekerjaanService (text) {
  let output : string = ''

  if (text.includes('ELUM')) {
    output = 'BELUM/TIDAK BEKERJA'
  }
  else {
    output = '-'
  }

  return output
}
