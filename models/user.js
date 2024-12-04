class User {
    // Dummy database
    static users = [
        new User('jd', 'John', 'Doe'),
        new User('jd', 'John', 'Doe'),
        new User('jd', 'John', 'Doe'),
        new User('jd', 'John', 'Doe'),
        new User('jd', 'John', 'Doe'),
    ]

    constructor(username, firstName, lastName,) {
        this.username = username
        this.firstName = firstName
        this.lastName = lastName;
    }

    static getUsers() {
        return User.users
    }

    createUser(username, firstName, lastName) {
        let newUser = new User(username, firstName, lastName)
        users.push(newUser);
        console.log(users)
    }
}

module.exports = User
