const birthDateInput = document.querySelector("#birth-date");
const checkBtn = document.querySelector("#check-btn");
const outputMsg = document.querySelector("#output");


function reverseStr(date) {
  var splitStr = date.split("");
  var reverseStr = splitStr.reverse();
  var joinStr = reverseStr.join("");
  return joinStr;
  // console.log(date.split("").reverse().join(""));
  //the above program in one line.
}

function isPalindrome(date) {
  var dateStr = reverseStr(date);

  return date===dateStr;
}

function numberToStr(date) {

  var strDate = {
    day: " ",
    month: " ",
    year: " ",
  }

  if (date.day < 10) {
    strDate.day = "0" + date.day;
  }
  else strDate.day = date.day.toString();

  if (date.month < 10) {
    strDate.month = "0" + date.month;
  }
  else strDate.month = date.month.toString();

  strDate.year = date.year.toString();

  return strDate;
}

function getDateInAllFormats(date) {

  var dateFormat = numberToStr(date);

  var ddmmyyyy = dateFormat.day + dateFormat.month + dateFormat.year;
  var mmddyyyy = dateFormat.month + dateFormat.day + dateFormat.year;
  var yyyymmdd = dateFormat.year + dateFormat.month + dateFormat.day;
  var ddmmyy =  dateFormat.day + dateFormat.month + dateFormat.year.slice(-2);
  var mmddyy = dateFormat.month + dateFormat.day + dateFormat.year.slice(-2);
  var yymmdd = dateFormat.year.slice(-2) + dateFormat.month + dateFormat.day;

  return allFormatDate = [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllFormats(date) {

 var palindromeCheckList = getDateInAllFormats(date);

 var flag = false;
  for (let index = 0; index < 
    palindromeCheckList.length; index++) {
    if (isPalindrome(palindromeCheckList[index])) {
      flag = true;
      break;
    };
  }
  return flag;
}

function isLeapYear(year) {
  if(year % 400 === 0) {
    return true;
  }
  else if(year % 100 === 0) {
    return false;
  }
  else if(year % 4 === 0) {
    return true;
  }
  return false;
}

function getTheNextDate(date) {
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

  if(month === 2) {
    if(isLeapYear(year)) {
      if(day > 29) {
        day = 1;
        month++;
      }
    }
    else {
      if(day > 28) {
        day = 1;
        month++;
      }
    }
  }
  else {
    if(day > daysInMonth[month-1]) {
      day = 1;
      month++;
    }
  }
  if(month > 12) {
    month = 1;
    year++;
  }
  return {
    day : day,
    month : month,
    year : year,
  }
}

function getTheNextPalindromeDate(date) {
  var counter = 0;
  var nextDate = getTheNextDate(date);

  while(1) {
    counter++;
    var palindrome = checkPalindromeForAllFormats(nextDate);
    if(palindrome) {
      break;
    }
    nextDate = getTheNextDate(nextDate);
  }
  return [counter, nextDate];
}

function getThePreviousDate(date) {
  var day = date.day - 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

  if(month === 3) {
    if(isLeapYear(year)) {
      if(day < 1) {
        day = 29;
        month--;
      }
    }
    else {
      if(day < 1) {
        day = 28;
        month--;
      }
    }
  }    
  else {
    if(day < 1) {
      day = daysInMonth[month-2];
      month--;
    }
  }
  if(month < 1) {
    day = 31;
    month = 12;
    year--;
  }
  return {
    day : day,
    month : month,
    year : year,
  }
}

function getThePreviousPalindromeDate(date) {
  var ctr = 0;
  var previousDate = getThePreviousDate(date);

  while(1) {
    ctr++;
    var palindrome = checkPalindromeForAllFormats(previousDate);
    if(palindrome) {
      break;
    }
    previousDate = getThePreviousDate(previousDate);
  }
  return [ctr, previousDate];
}

function clickHandler(e) { //e -> short var reference for event object -> passed to event handlers.

  var birthday = birthDateInput.value;

  if(birthday !== "") {
    var dateInArray = birthday.split("-")

    var date = {
      day: Number(dateInArray[2]),
      month: Number(dateInArray[1]),
      year: Number(dateInArray[0]),
    }

    var palindrome = checkPalindromeForAllFormats(date);
    if(palindrome) {
    outputMsg.innerText = "Yay! Your Birthday is a Palindrome!🎉🤩"
    }
    else {
      var [counter, nextDate] = getTheNextPalindromeDate(date);
      var [ctr, previousDate] = getThePreviousPalindromeDate(date);
      if(counter < ctr) {
        outputMsg.innerText = `The closest Palindrome date is 
      ${nextDate.day}-${nextDate.month}-${nextDate.year} . You 
      missed by ${counter} days.`
      }
      else {
        outputMsg.innerText = `The closest Palindrome date is ${previousDate.day}-${previousDate.month}-${previousDate.year}. You missed by ${ctr} days.`
      }
    }  
  }
    
}

checkBtn.addEventListener("click", clickHandler);

