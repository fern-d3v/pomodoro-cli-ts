// TypeScript Lesson 1: Basic Function with Types
// Fill in the blanks marked with // TODO:

// TODO: Create a function called 'addNumbers' that:
// - Takes two parameters: 'a' and 'b', both should be numbers
// - Returns a number
// - Actually adds the two numbers together
function addNumbers(a: number, b: number): number {
  return a + b;
}

// TODO: Create variables with explicit types
const firstNumber: number = 10;
const secondNumber: number = 25;

// TODO: Call the function and store the result
const result: number = addNumbers(firstNumber, secondNumber);

// TODO: Log the result to console with a nice message
console.log(`The sum of ${firstNumber} and ${secondNumber} is: ${result}`);

// BONUS CHALLENGE (try after completsng above):
// TODO: Create a function that takes a name (string) and age (number)
// and returns a greeting message (string)
function createGreeting(name: string, age: number): string {
  return `Hello, ${name}! You are ${age} years old.`; // Should return something like "Hello, John! You are 25 years old."
}

// TODO: Test the greeting function
const greeting: string = createGreeting("fern", 33);
console.log(greeting);
