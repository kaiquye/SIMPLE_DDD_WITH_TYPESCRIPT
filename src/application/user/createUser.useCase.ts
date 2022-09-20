import { UserEntity } from "../../domain/user/user.entity";
import { UserDomain } from "../../domain/user/user.domain";
import { UserRepository } from "../../infrastructure/database/repository/user/Repository";
import { AuthDomain } from "../../domain/auth/auth.domain";
import { IUseCase } from "../useCase.adapter";
import { Result } from "../../infrastructure/template/error/result.template";

interface IResponse {
  user: UserEntity;
  access_token: string;
  createdAt?: Date | string;
}

enum errosRefCodes {
  INTERNAL = "error.internal.server.contact.administrator",
}

export class CreateUserUseCase implements IUseCase<UserEntity, IResponse> {
  private readonly _errorCreateUser = "unable to create a new user";

  async execute(data?: UserEntity): Promise<Result<IResponse>> {
    try {
      const auth = new AuthDomain(
        new UserRepository(),
        data.email,
        data.password
      );

      let passwordHash = auth.genereteHash();

      const user = new UserDomain(
        new UserRepository(),
        data.name,
        data.phone,
        data.email,
        passwordHash
      );

      const created = await user.create();

      if (created) {
        const token = await auth.signIn();

        return Result.ok<IResponse>(
          {
            user: created,
            access_token: token,
          },
          201
        );
      }
    } catch (errorInCreateUser) {
      return Result.fail<IResponse>(
        this._errorCreateUser,
        400,
        errosRefCodes.INTERNAL
      );
    }
  }
}
