import { IUseCase } from "../useCase.adapter";
import { AuthDomain } from "../../domain/auth/auth.domain";
import { UserRepository } from "../../infrastructure/repository/user/Repository";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  token: string;
}

export class SignUserUseCases implements IUseCase<IRequest, IResponse> {
  async execute(data?: IRequest): Promise<IResponse | any> {
    const auth = new AuthDomain(
      new UserRepository(),
      data.email,
      data.password
    );

    try {
      return await auth.signIn();
    } catch (errorSignUser) {
      return errorSignUser.message;
    }
  }
}
