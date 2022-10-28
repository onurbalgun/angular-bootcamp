var UserService = /** @class */ (function () {
    function UserService(users) {
        this.users = users;
    }
    UserService.prototype.getUserNames = function () {
        return this.users;
    };
    UserService.prototype.addUser = function (user) {
        this.users.push(user);
    };
    return UserService;
}());
var users = ["Onur", "Ahmet", "Mehmet"];
var userService = new UserService(users);
console.log(userService.getUserNames());
userService.addUser("Halit");
console.log(userService.getUserNames());
