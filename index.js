// Your code here
function createEmployeeRecord(employeeArray) {
  return {
    firstName: employeeArray[0],
    familyName: employeeArray[1],
    title: employeeArray[2],
    payPerHour: employeeArray[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(employeeRecords) {
    return employeeRecords.map(employeeArray => {
        return createEmployeeRecord(employeeArray);
      });
    
}
function createTimeInEvent(employee, timeStamp) {
    const [date, hour] = timeStamp.split(' ');
  
    employee.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour),
      date: date
    });
  
    return employee;
  }
  function createTimeOutEvent(employee, timeStamp) {
    const [date, hour] = timeStamp.split(' ');
  
    employee.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour),
      date: date
    });
  
    return employee;
  }
  
  function hoursWorkedOnDate(employee, date) {
    const timeInEvent = employee.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employee.timeOutEvents.find(event => event.date === date);
  
    const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
  
    return hoursWorked;
  }
  function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    const payOwed = hoursWorked * employee.payPerHour;
  
    return payOwed;
  }

  function allWagesFor(employee) {
    const datesWorked = employee.timeInEvents.map(event => event.date);
    const totalWages = datesWorked.reduce((total, date) => {
      return total + wagesEarnedOnDate(employee, date);
    }, 0);
  
    return totalWages;
  }
  function calculatePayroll(employeeRecords){
    const res = employeeRecords.map(employee => allWagesFor(employee))
    return res.reduce((total, wagePerEmployee) => total + wagePerEmployee)
}

    
  
  