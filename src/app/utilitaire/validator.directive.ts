/** A hero's name can't match the given regular expression */
import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function maxScoreHero(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const attaque = parseInt(control.value.attaque);
    const esquive = parseInt(control.value.esquive);
    const degats = parseInt(control.value.degats);
    const pv = parseInt(control.value.pv);
    const sum = attaque + esquive + pv + degats;

    return sum > 40 ? {maxScoreHero: true} : null;
  };
}

export function maxScoreWeapon(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const attaque = parseInt(control.value.attaque);
    const esquive = parseInt(control.value.esquive);
    const degats = parseInt(control.value.degats);
    const pv = parseInt(control.value.pv);
    const sum = attaque + esquive + pv + degats;

    return sum != 0 ? {maxScoreHero: true} : null;
  };
}
