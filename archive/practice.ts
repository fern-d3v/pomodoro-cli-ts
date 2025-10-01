// TypeScript Practice Session 2: Objects and Arrays
// Fill in the blanks to learn about typing objects and arrays!

// LESSON 1: Object Types
// TODO: Create a person object with proper types
const person: { name: string; age: number; isStudent: boolean } = {
  name: "fern", // Put your name here (in quotes)
  age: 33, // Put your age here (number)
  isStudent: true, // true or false
};

console.log(
  `Person: ${person.name}, Age: ${person.age}, Student: ${person.isStudent}`,
);

// LESSON 2: Array Types
// TODO: Create arrays with specific types
const numbers: number[] = [1, 5, 10, 15]; // Array of numbers
const fruits: string[] = ["apple", "banana", "grape"]; // Array of strings
const flags: boolean[] = [true, false]; // Array of booleans

console.log("Numbers:", numbers);
console.log("Fruits:", fruits);
console.log("Flags:", flags);

// LESSON 3: Function with Object Parameter
// TODO: Create a function that takes a person object and returns a description
function describePerson(p: {
  name: string;
  age: number;
  isStudent: boolean;
}): string {
  const studentStatus = p.isStudent ? "is a student" : "is not a student";
  return `${p.name} is ${p.age} years old and ${studentStatus}`;
}

// TODO: Test the function
const description: string = describePerson(person);
console.log(description);

// LESSON 4: Optional Properties (BONUS!)
// The ? makes a property optional - it might or might not exist
const optionalPerson: { name: string; age?: number; email?: string } = {
  name: "Mystery Person",
  // Notice: age and email are missing, but that's OK because of the ?
};

console.log("Optional person:", optionalPerson);

// CHALLENGE: Can you add an age to optionalPerson after it's created?
// TODO: Try this syntax: optionalPerson.age = ______;

