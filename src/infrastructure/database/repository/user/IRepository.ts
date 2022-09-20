import { UserEntity } from "../../../domain/user/user.entity";

export interface IRepositoryUser {
  create(data: UserEntity): Promise<UserEntity>;
  update(data: Partial<UserEntity>): Promise<boolean>;
  findAll(): Promise<UserEntity[]>;
  exists(where: Partial<UserEntity> | {}): Promise<UserEntity | null>;
}
