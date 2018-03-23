/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

export class NumbersHelper {

  getFixedFloat (num, saveDot = false, toFixed = true): number {
    num = num ? num.replace( /[^\d.,]/g, '') : 0;
    if (!num) {
      num = 0;
    } else {
      num = num.replace(',', '.');
      const lastChar = num.slice(-1);
      num = parseFloat(num);
      if (saveDot && lastChar === '.') {
        num += lastChar;
      }
    }
    if (toFixed) {
      num = Number(num) === num && num % 1 !== 0 ? num.toFixed(2) : num;
    }
    return num;
  }

}
