export function numberWithSpaces(str: string | number = '') {
    return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
  