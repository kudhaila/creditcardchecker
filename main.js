// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];


// Add your functions below:

///checks if Card number passed is valid.
const validateCred = array => { 
  let copy = array.slice(); // creates a clone of the array that is passed into the function

  for (let i = copy.length - 2 ; i >= 0; i-= 2) { 
    // iterates backwards and multiplies every other number by 2, subtracts 9 if the number passed is > 9
    copy[i] *= 2;
    if (copy[i] > 9) { 
      copy[i] -= 9;
    }
  }

  let cardSum = copy.reduce((a, b) => a + b); // Uses the reduce method to sum up the copy array.
  // below checks to see if the answer of the sum from above has no remainder. If it doesn't then it will return true, if it does then it returns false.
  let result = cardSum % 10 === 0;
  return result;
}
// log to see if the card number is valid or not

console.log("Is this card number a valid number?:", validateCred(mystery4));

// this function goes through the batch of nested arrays and finds invalid cards
const findInvalidCards = isInvalid => { 
  let invalids = []; //this creates an empty array that we will store all of the invalid card numbers into.

// we use a for loop here to go through all of the arrays
  for (let i = 0; i < isInvalid.length; i++) { 
    // the if statement checks to see if the nested array when put into the validateCred function returns false, if so then it stores that in the invalidCards empty array.
    if (validateCred(isInvalid[i]) === false){ 
      invalids.push(isInvalid[i]);
    }
  }
  // notice where this is placed so it returns what we want! This is to do with the scope
  return invalids;
  console.log(findInvalidCards(invalids))
}
// this logs the function to see what the console prints as a result
console.log("The invalid Cards Numbers are:", findInvalidCards(batch));


// a function to find out what card companies made mistakes!
const idInvalidCardCompanies = invalidNumbers => { 
  // we create an empty array that will tell us the answer
  let cardCompanies = [];

  // this bit is not needed, but makes your life a lot easier. We utitlise the previous function and use this functions parameter.
  let getInvalids = findInvalidCards(invalidNumbers);
  // for loop that goes through every invalid card number
  for (i = 0; i < getInvalids.length; i++) { 
    // this simplifies a large bit of code down by creating the find variable. The slice method allows us to extract only the first element of the array. 
    let find = getInvalids[i].slice(0, 1);

    // these conditions check to see if the first number of the array and based on whichever is true it prints the following statements
    if (find == 3) { 
      cardCompanies.push("Amex (American Express)");
    } else if ( find == 4) { 
      cardCompanies.push("Visa");
    } else if ( find == 5) { 
      cardCompanies.push("Mastercard");
    } else if (find == 6) { 
      cardCompanies.push("Discover");
    } else { 
      cardCompanies.push('Company not found')
    }
  }
  // returns the array of all the card companies 
  return cardCompanies;
}

// prints the following statement including the array
console.log("The Card Companies that have mailed out cards with invalid numbers are:" ,idInvalidCardCompanies(batch));
