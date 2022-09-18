import * as express from "express";
import userRoutes from "./infrastructure/routes/user.routes";

class Main {
  private server = express();

  constructor(PORT: number) {
    this.server.use(express.json());
    this.routes();
    this.start(PORT);
  }

  private start(PORT: number) {
    this.server.listen(PORT, () => console.log("start server..."));
  }

  private routes() {
    this.server.use(userRoutes);
  }
}

try {
  new Main(8080);
} catch (e) {
  console.log(e);
}
