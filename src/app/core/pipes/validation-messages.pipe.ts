import { Pipe, PipeTransform } from '@angular/core';
import { validationMessageQ } from '../repos/validation-messages.repository';

@Pipe({
  name: 'validationMessage',
  standalone: true
})
export class ValidationMessagePipe implements PipeTransform {

  transform(control: string, formKeyName: string): any {
    const validationMessages = validationMessageQ()?.[formKeyName]?.[control];
    console.log(validationMessageQ(), validationMessages);
    if (!validationMessages) {
      console.warn(`Validation messages not found for ${control} in ${formKeyName}`)
      return { default: {} };
    }
    // if (!validationMessages) throw Error(`Validation Messages for '${control}' not found.`);
    validationMessages['maxlength'] = 'Length Exceeded';
    return { default: validationMessages };
  }

}
