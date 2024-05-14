import { Request, Response, Router, response } from "express";
import TunaController from "../controllers/tuna.controller";

const tunaController = new TunaController();
const routes = Router();
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
routes.post("/create", async (req: Request, res: Response) => {
  try {
    const tuna = req.body;
    const response = await tunaController.saveItemTuna(tuna);
    return res.status(response.code).json(response);
  } catch (error: any) {
    return res.status(error.code ? error.code : 500).json(error);
  }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
routes.get("/getTuna/:_id", async (req: Request, res: Response) => {
  const {_id} = req.params
  try {
    const response = await tunaController.getTunaByCodet(String(_id));
    return res.status(response.code).json(response);
  } catch (error: any) {
    return res.status(error.code ? error.code : 500).json(error); 
  }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
routes.put("/putTuna/:_id", async (req: Request, res: Response) => {
  const {_id} =req.params
  const fish = req.body
  try {
    const response = await tunaController.putTunaByCodet(String(_id),fish);
    return res.status(response.code).json(response);
  } catch (error: any) {
    return res.status(error.code ? error.code : 500).json(error);
  }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
routes.delete("/deleteTuna/:_id", async (req: Request, res: Response) => {
  const {_id} = req.params
  try {
    const response = await tunaController.deleteTunaByCodet(String(_id));
    return res.status(response.code).json(response);
  } catch (error: any) {
    return res.status(error.code ? error.code : 500).json(error);
  }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
routes.get("/getllTuna", async (req: Request, res: Response) => {
  
  try {
    const response = await tunaController.getAllTuna();
    return res.status(response.code).json(response);
  } catch (error: any) {
    return res.status(error.code ? error.code : 500).json(error);
  }
});
export default routes;