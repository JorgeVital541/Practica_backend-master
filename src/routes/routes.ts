import { Request, Response, Router, response } from "express";
import ReclutControler from "../controllers/reclut.controller";

const reclutControler = new ReclutControler();
const routes = Router();

routes.post("/create" , async (req:Request, res:Response) => {
    try {
        const reclut = req.body;
        const response = await reclutControler.saveReclut(reclut)
        return res.status(response.code).json(response)
    } catch (error:any) {
        return res.status(error.code ? error.code : 500).json(error)
    }
})

routes.get("/getReclut/:workerid",async (req:Request, res:Response) => {
    try {
        const workerid = req.params.workerid
        const response = await reclutControler.getReclut(workerid)
        return res.status(response.code).json(response)
    } catch (error:any) {
        return res.status(error.code ? error.code : 500).json(error)
    }
})
routes.put("/id",async (req:Request, res:Response) => {
try { const id = req.params.workerid;
    const recluts = req.body 
    const response = await reclutControler.getReclut(id)
    
} catch (error: any) {
    return res.status(error.code ? error.code: 500).json(error)
}
})

export default routes