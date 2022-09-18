export interface IUseCase<Request, Response> {
  execute(data?: Request, params?): Promise<Response>;
}
