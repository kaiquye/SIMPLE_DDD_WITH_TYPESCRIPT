import { IUseCase } from "../useCase.adapter";
import { UserEntity } from "../../domain/user/user.entity";
import { UserDomain } from "../../domain/user/user.domain";
import { UserRepository } from "../../infrastructure/repository/user/Repository";

export class FindAllUserUseCase implements IUseCase<void, UserEntity[]> {
  execute(): Promise<UserEntity[]> {
    const domain = new UserDomain(new UserRepository());

    try {
      return domain.findAllUsersActive();
    } catch (errorFindUsers) {
      return errorFindUsers.members;
    }
  }
}
