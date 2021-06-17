import React, { Component } from "react";
import Input from "../components/common/Input";
import Joi from "joi-browser";

export default class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  validate = () => {
    const options = { abortEarly: false }
    const { error } = Joi.validate(this.state.account, this.schema, options );

    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = {[name]: value}
    const schema ={[name]:this.schema[name]}
    const {error} = Joi.validate(obj,schema)
    return error ? error.details[0].message:null
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    // console.log(errors);
    //ถ้าได้ null ให้ setState เป็น {} เพราะ react อ่านค่า null ไม่ได้
    this.setState({ errors: errors || {} });
    if (errors) return;
    console.log("Submited");
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const account = { ...this.state.account };
    account[input.name] = input.value;

    this.setState({ account, errors });
    // console.log(input);
  };

  render() {
    const { account, errors } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            autoFocus={true}
            name="username"
            value={account.username}
            label="Username"
            onChange={this.handleChange}
            error={errors.username}
            type="text"
          />
          <Input
            name="password"
            value={account.password}
            label="Password"
            onChange={this.handleChange}
            error={errors.password}
            type="password"
          />

          <button disabled ={this.validate()} className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}
