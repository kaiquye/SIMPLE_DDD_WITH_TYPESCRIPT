import { Request, Response } from "express";
import { CreateUserUseCase } from "../../application/user/createUser.useCase";
import { SignUserUseCases } from "../../application/auth/signUser.useCases";
import { FindAllUserUseCase } from "../../application/user/findAllUser.useCase";

class UserController {
  public async create(req: Request, res: Response) {
    const createUser = new CreateUserUseCase();

    const body = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
    };

    const result = await createUser.execute(body);

    return result.getHttpResult(res);
  }

  public async sign(req: Request, res: Response) {
    const signInUser = new SignUserUseCases();

    const body = {
      email: req.body.email,
      password: req.body.password,
    };

    const result = await signInUser.execute(body);

    return result.getHttpResult(res);
  }

  async findAllUser(req: Request, res: Response) {
    const application = new FindAllUserUseCase();

    const result = await application.execute();

    return result.getHttpResult(res);
  }
}

export default new UserController();
