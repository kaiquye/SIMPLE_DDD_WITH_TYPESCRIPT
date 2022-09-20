import { IRepositoryUser } from "./IRepository";
import { UserEntity } from "../../../domain/user/user.entity";
import { PrismaClient } from "@prisma/client";

export class UserRepository implements IRepositoryUser {
  private databaseCon: PrismaClient;

  constructor() {
    this.databaseCon = new PrismaClient();
  }

  create(data: UserEntity): Promise<UserEntity> {
    return this.databaseCon.user.create({ data });
  }

  exists(where: Partial<UserEntity> | {}): Promise<UserEntity | null> {
    return this.databaseCon.user.findFirst({ where });
  }

  findAll(): Promise<UserEntity[]> {
    return this.databaseCon.user.findMany();
  }

  update(data: Partial<UserEntity>): Promise<boolean> {
    return Promise.resolve(false);
  }
}
