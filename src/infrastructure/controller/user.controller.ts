import { Request, Response } from "express";
import { CreateUserUseCase } from "../../application/user/createUser.useCase";
import { SignUserUseCases } from "../../application/auth/signUser.useCases";
import { FindAllUserUseCase } from "../../application/user/findAllUser.useCase";

class UserController {
  public async create(req: Request, res: Response) {
    const createUser = new CreateUserUseCase();

    const result = await createUser.execute(req.body);

    return res.send(result);
  }

  public async sign(req: Request, res: Response) {
    const signInUser = new SignUserUseCases();

    const body = {
      email: req.body.email,
      password: req.body.password,
    };

    const result = await signInUser.execute(body);

    console.log(result);

    return res.send(result);
  }

  async findAllUser(req: Request, res: Response) {
    const application = new FindAllUserUseCase();

    const result = await application.execute();

    console.log(result);

    return res.send(result);
  }
}

export default new UserController();
