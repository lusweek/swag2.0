const date = new Date()
let month = date.getMonth();
// months is from 0 - 11. is true from may to october
console.log(month);
let isSummer = (month <= 6 || 10 || 11 ? false : true)

export default isSummer