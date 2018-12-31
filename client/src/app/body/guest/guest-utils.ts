import { ValidatorFn, AbstractControl } from '@angular/forms';
import { controlNameBinding } from '@angular/forms/src/directives/reactive_directives/form_control_name';

export function checkPassword(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} |
  null => {
    const pass = control.value;
    if (pass.length < 8) {
      return { 'checkPassword': 'Password is too short.' };
    } else if (pass.length > 12) {
      return { 'checkPassword': 'Password is too long.' };
    } else if (pass.length - pass.replace(/[A-Z]/g, '').length < 1) {
      return { 'checkPassword': 'Too few upper case letters.' };
    } else if (pass.length - pass.replace(/[a-z]/g, '').length < 3) {
      return { 'checkPassword': 'Too few lower case letters.' };
    } else if (pass.length - pass.replace(/[0-9]/g, '').length < 3) {
      return { 'checkPassword': 'Too few numbers.' };
    } else if (pass.length - pass.replace(/[#*.!?$]/g, '').length < 1) {
      return { 'checkPassword': 'Too few special characters (#*.!?$).' };
    } else if (!pass[0].match(/[a-zA-Z]/i)) {
      return { 'checkPassword': 'Password not starting with a letter.' };
    } else if (pass.match(/^.*(.)\1+.*$/g)) {
      return { 'checkPassword': 'Password contains two consecutive characters.' };
    }
    return null;
  };
}

export function passNoMatch(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} |
  null => {
    if (control.get('newPass1').value !== control.get('newPass2').value) {
      return { 'passNoMatch': 'Entered passwrods not matching.' };
    }
    return null;
  };
}
