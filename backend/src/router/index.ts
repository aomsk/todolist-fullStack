import { Router } from "express";
import todos from "./todos"; // router todos

const router = Router();

// Export router
export default (): Router => {
  todos(router);

  return router;
};
