import { UserEntity } from "../../domain/user/user.entity";
import { UserDomain } from "../../domain/user/user.domain";
import { UserRepository } from "../../infrastructure/repository/user/Repository";
import { AuthDomain } from "../../domain/auth/auth.domain";
import { IUseCase } from "../useCase.adapter";

interface IResponse {
  user: UserEntity;
  access_token: string;
  createdAt?: Date | string;
}

export class CreateUserUseCase implements IUseCase<UserEntity, IResponse> {
  async execute(data?: UserEntity): Promise<IResponse> {
    try {
      const auth = new AuthDomain(
        new UserRepository(),
        data.email,
        data.password
      );

      let password = auth.genereteHash();

      const user = new UserDomain(
        new UserRepository(),
        data.name,
        data.phone,
        data.email,
        password
      );

      const created = await user.create();

      if (created) {
        const token = await auth.signIn();

        return {
          user: created,
          access_token: token,
        };
      }
    } catch (e) {
      return e.message;
    }
  }
}
