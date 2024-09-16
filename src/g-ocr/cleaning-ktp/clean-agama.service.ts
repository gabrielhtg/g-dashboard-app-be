export function cleanAgamaService (text) {
  let output : string = ''

  if (text.includes('STEN')) {
    output = 'KRISTEN'
  }
  else if (text.includes('SLAM')) {
    output = 'ISLAM'
  }
  else if (text.includes('TOLI')) {
    output = 'KATOLIK'
  }
  else if (text.includes('NDU')) {
    output = 'HINDU'
  }
  else if (text.includes('DHA')) {
    output = 'BUDDHA'
  }
  else if (text.includes('HUC')) {
    output = 'KHONGHUCU'
  }
  else {
    output = '-'
  }

  return output
}
