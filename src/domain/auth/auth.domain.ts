import * as bcrypt from "bcrypt";
import { IRepositoryUser } from "../../infrastructure/repository/user/IRepository";
import { sign } from "jsonwebtoken";

export class AuthDomain {
  private readonly token;
  private readonly secret = process.env.SECRET;

  private id;
  private readonly email;
  private readonly password;

  constructor(
    private database: IRepositoryUser,
    email: string,
    password: string
  ) {
    this.email = email;
    this.password = password;
  }

  public async signIn() {
    const data = await this.database.exists({ email: this.email });

    if (!data) {
      throw new Error("Invalid password or email");
    }

    const match = this.compareHash(this.password, data.password);

    if (match) {
      this.id = data.id;
      return this.genereteToken();
    } else {
      throw new Error("Invalid password or email");
    }
  }

  public signOut() {
    return null;
  }

  public genereteHash() {
    let saltRounds = 10;

    const salt = bcrypt.genSaltSync(saltRounds);

    return bcrypt.hashSync(this.password, salt);
  }

  private compareHash(password: string, hahs: string) {
    const match = bcrypt.compareSync(password, hahs);
    if (match) {
      return true;
    }
    return null;
  }

  private genereteToken() {
    const payload = { email: this.email, id: this.id };
    return sign(payload, this.secret, { expiresIn: 60 * 60 });
  }
}
