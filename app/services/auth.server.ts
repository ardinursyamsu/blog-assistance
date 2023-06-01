import { Authenticator, AuthorizationError } from "remix-auth";
import { sessionStorage } from "./session.server";
import { User, login } from "~/components/helper";

export let authenticator = new Authenticator<User>(sessionStorage);

import { FormStrategy } from "remix-auth-form";
import invariant from "tiny-invariant";
import bcrypt from 'bcrypt';

// Tell the Authenticator to use the form strategy
authenticator.use(
  new FormStrategy(async ({ form }) => {
    let email = form.get("email");
    invariant(typeof email === "string", "Data must be string")

    let password = form.get("password");
    invariant(typeof password === "string", "Data must be string")
    const salt = bcrypt.genSaltSync(Number(process.env.SALT));
    const hashedPassword = bcrypt.hashSync(password, salt);
    
    if (email !== process.env.EMAIL && password !== process.env.HASH){
        throw new AuthorizationError("User is not authorized")
    }
    let user = login(email, password);
    // the type of this user must match the type you pass to the Authenticator
    // the strategy will automatically inherit the type if you instantiate
    // directly inside the `use` method
    return user;
  }),
  // each strategy has a name and can be changed to use another one
  // same strategy multiple times, especially useful for the OAuth2 strategy.
  "user-pass"
);
