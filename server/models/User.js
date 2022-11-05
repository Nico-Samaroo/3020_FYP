const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    methods: {
      withoutPassword() {
        return {
          name: this.name,
          email: this.email,
        };
      },
    },
  }
);

const UserModel = model("User", UserSchema);

module.exports = UserModel;