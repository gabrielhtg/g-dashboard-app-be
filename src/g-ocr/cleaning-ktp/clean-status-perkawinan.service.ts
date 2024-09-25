export function cleanStatusPerkawinanService (text) {
  let output : string = ''

  if (text.includes('ELUM')) {
    output = 'BELUM KAWIN'
  }
  else {
    output = 'KAWIN'
  }

  return output
}
