class User {
    // Dummy database
    static users = [
        new User(1, 'jd', 'John', 'Doe'),
        new User(2, 'jo', 'Jonathan', 'Joestar'),
        new User(3, 'jojo', 'Joseph', 'Joestar'),
        new User(4, 'jotaro', 'Jotaro', 'Kujo'),
    ]

    constructor(id, username, firstName, lastName,) {
        this.id = id;
        this.username = username
        this.firstName = firstName
        this.lastName = lastName;
    }

    static getUsers() {
        return User.users
    }


    static createUser(username, firstName, lastName) {
        let newUser = new User(username, firstName, lastName)
        users.push(newUser);
        console.log(users)
    }

    static getUserById(id) {
        let user = this.users.find(user => user.id == id)
        if (user) {
            console.log(user)
            return user
        } else {
            let err = new Error("User not found")
            err.status = 404
            throw err
        }
    }

    updateUser() {
    }

    deleteUser() {

    }

    deleteUserById(id) {

    }
}

module.exports = User
