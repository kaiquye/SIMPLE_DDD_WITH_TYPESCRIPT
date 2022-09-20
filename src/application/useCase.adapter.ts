import { Result } from "../infrastructure/template/error/result.template";

export interface IUseCase<Request, Response> {
  execute(data?: Request, params?): Promise<Result<Response>>;
}
