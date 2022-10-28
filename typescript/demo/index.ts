

class UserService{
    private users:string[];
    constructor(users:string[]) {
       this.users=users; 
    }
    getUserNames():string[]
    {
        return this.users;
    }
    addUser(user:string)
    {
        this.users.push(user);
    }
}

let users=["Onur","Ahmet","Mehmet"];
let userService = new UserService(users);
console.log(userService.getUserNames());
userService.addUser("Halit")
console.log(userService.getUserNames());
 
