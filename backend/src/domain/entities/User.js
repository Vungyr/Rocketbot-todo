// User entity
module.exports = class User {
    constructor({ id, auth0Id, email, name }) {
      this.id = id;
      this.auth0Id = auth0Id;
      this.email = email;
      this.name = name;
    }
  };
  