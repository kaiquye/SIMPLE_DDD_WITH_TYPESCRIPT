import { UserEntity } from "./user.entity";
import { IRepositoryUser } from "../../infrastructure/repository/user/IRepository";

export class UserDomain {
  private readonly id: number | string;
  private name: string;
  private email: string;
  private phone: string;
  private password: string;
  private createdAt: Date | string | null;
  private updateAt: Date | string | null;

  constructor(
    private database: IRepositoryUser,
    name?: string,
    phone?: string,
    email?: string,
    password?: string
  ) {
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.password = password;
  }

  public get Id() {
    return this.id;
  }

  public get Name() {
    return this.name;
  }

  public get Email() {
    return this.email;
  }

  public get Phone() {
    return this.phone;
  }

  public get Password() {
    return this.password;
  }

  public async create() {
    if (this.password.length < 6 || this.name.length < 4) {
      throw new Error("name or password too short");
    }

    const data: UserEntity = {
      email: this.email,
      name: this.name,
      phone: this.phone,
      password: this.password,
    };

    await this.existsIsFail({ email: this.email, phone: this.phone });

    return this.database.create(data);
  }

  public async findAllUsersActive() {
    return this.database.findAll();
  }

  private async existsIsFail(where: string | {}): Promise<void> {
    const result = await this.database.exists(where);

    if (result) {
      throw new Error("user already registered");
    }
  }
}
