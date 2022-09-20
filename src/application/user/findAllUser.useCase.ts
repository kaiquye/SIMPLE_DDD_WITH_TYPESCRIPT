import { IUseCase } from "../useCase.adapter";
import { UserEntity } from "../../domain/user/user.entity";
import { UserDomain } from "../../domain/user/user.domain";
import { UserRepository } from "../../infrastructure/database/repository/user/Repository";
import { Result } from "../../infrastructure/template/error/result.template";

enum errosRefCodes {
  INTERNAL = "error.user.services.internal.level.adm",
}

export class FindAllUserUseCase implements IUseCase<void, UserEntity[]> {
  private readonly errorFindAllMsg = "error when fetching all users";

  constructor() {}

  async execute(): Promise<Result<UserEntity[]>> {
    const domain = new UserDomain(new UserRepository());

    try {
      const result = await domain.findAllUsersActive();

      return Result.ok(result, 200);
    } catch (errorFindUsers) {
      return Result.fail(this.errorFindAllMsg, 500, errosRefCodes.INTERNAL);
    }
  }
}
