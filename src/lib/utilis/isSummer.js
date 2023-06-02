export default function isSummer() {
    var today = new Date();
    var month = today.getMonth() + 1; // Månader är nollindexerade, därför lägger vi till 1
    var day = today.getDate();
  
    if ((month > 5 && month < 10) || (month === 5 && day >= 25) || (month === 10 && day <= 15)) {
      return true;
    } else {
      return false;
    }
  }
  
  