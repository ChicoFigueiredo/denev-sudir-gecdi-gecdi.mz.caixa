import { AbstractControl } from '@angular/forms';

export function ValidateMessage(control: AbstractControl) {
  if (control.value.indexOf('{{') >= 0) {
    if (!/[{][{](Campo[1-5])[}][}]/gm.test(control.value))
      return { invalidMessage: true, message: 'Campo adicionado errado, tem que ser camel case e de 1 a 5. Ex.: {{Campo1}}' };
  }
  if(/(\w)\1{3,}/gmi.test(control.value))
      return { invalidMessage: true, message: 'Não é admitido repetição de letras' };

  return null;
}
