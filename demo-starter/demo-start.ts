//* type-safe
import User from "./user";

console.log("Hello from typescript file");

function sayHello(name: string): void {
  console.log(`Hello ${name}`);
}

sayHello("Omer Faruk");

let sumFunction = (a1: number, a2: number): number => {
  return a1 + a2;
};

let sumOfNumbers: number = sumFunction(5, 6);
console.log(sumOfNumbers);

class Greeter {
  private name: string;
  constructor(name: string) {
    this.name = name;
  }

  sayHi() {
    console.log(`Hello ${this.name}`);
    this.sayWhatsUp();
  }

  private sayWhatsUp() {
    console.log("What's up?");
  }
}

let greeter = new Greeter("Omer");
greeter.sayHi();

//* userService classi olusturalim.
//* string[] olarak getUserNames fonksiyonu olusturalim.
//* string name alan bir ekleme metodu
//* classin icinde bir array ile tutalim. Ancak bu arraya disardan ulasim yasak.

class UserService {
  private userArray: User[] = [];

  getUsers(): User[] {
    return this.userArray;
  }

  addUser(user: User): void {
    this.userArray.push(user);
  }
}

const userService = new UserService();
console.log(userService.getUsers());
userService.addUser({ name: "Omer", surname: "Guldu", age: 26 });
console.log(userService.getUsers());
