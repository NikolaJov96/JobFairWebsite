export function checkPassword(pass: string): string {
  if (pass.length < 8) {
    return 'too short';
  } else if (pass.length > 12) {
    return 'too long';
  } else if (pass.length - pass.replace(/[A-Z]/g, '').length < 1) {
    return 'too few capital letters';
  } else if (pass.length - pass.replace(/[a-z]/g, '').length < 3) {
    return 'too few lower case letters';
  } else if (pass.length - pass.replace(/[0-9]/g, '').length < 3) {
    return 'too few numbers';
  } else if (pass.length - pass.replace(/[#*.!?$]/g, '').length < 1) {
    return 'too few special characters';
  } else if (!pass[0].match(/[a-zA-Z]/i)) {
    return 'not starting with letter';
  } else if (pass.match(/^.*(.)\1+.*$/g)) {
    return 'contains two consecutive characters';
  }
  return '';
}
