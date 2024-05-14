import logger from "../../lib/logger";
import MongoConn from "../../lib/mongodb";
import ITuna from "../interfaces/tuna.interface";
import IResponse from "../interfaces/response.interface";
import ItemTuna from "../models/tuna.model";
import Tunam from "../models/tuna.model";

export default class tunaControler{
    private mongoConn: MongoConn; 
    constructor(){
        this.mongoConn = new MongoConn();
    }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
    async saveItemTuna(tuna:ITuna):Promise<IResponse>{
        try {
            await this.mongoConn.connectDB();
            if(tuna){
                const tunaExist=await ItemTuna.findOne({codet:tuna.codet})
                if(tunaExist){
                    return ({ok:false, message:"Product exist", response: null, code: 409})
                }
                
                 const tunaSave = await Tunam.create(tuna);
                return ({ok:true,message:"Product created", response: tunaSave, code: 200})

                
            }
            return ({ok:false,message:"Incorrect parameters", response: null, code: 400})

        } catch (error) {
            logger.error("[tunaController/savetuna] " + error);
            return ({ok:false,message:"Error on DataBase", response: null, code: 500})
        }finally{
            await this.mongoConn.disconnectDB();
        }
    }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
    async getTunaByCodet(id: string):Promise<IResponse>{
        try {
            await this.mongoConn.connectDB();
            const tunaExist = await Tunam.findOne({_id:id})
                if(tunaExist){
                    return ({ok:true,message:"Se encontro Tuna", response: tunaExist, code: 200})
            }
            return ({ok:false,message:"No se encontro Tuna", response: null, code: 400})
        } catch (error) {
            logger.error("[tunaController/getTunaByCodet] " + error);
            return ({ok:false,message:"Error on DataBase", response: null, code: 500})
        }finally{
            await this.mongoConn.disconnectDB();
        }
    }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
    async putTunaByCodet(id: string, tunaUpdate:ITuna):Promise<IResponse>{
        try {
            await this.mongoConn.connectDB();
            const tunaExist = await Tunam.findOneAndUpdate({_id:id}, tunaUpdate);
                if (!tunaUpdate) {
                    return { ok: false, message: "No se Modifico Tuna", response: null, code: 404};
            }
        
            return { ok: true, message: "Tuna Actualizado", response: tunaExist, code: 200};

        } catch (error) {

            logger.error("[tunaController/putTunaByCodet] " + error);
            return { ok: false, message: "Database error", response: null, code: 500 };
        } finally {
            await this.mongoConn.disconnectDB();
        }
    }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
    async deleteTunaByCodet(id: string):Promise<IResponse>{
        try {
            await this.mongoConn.connectDB();    
                const tunaDelete = await Tunam.findOneAndDelete({_id:id});
                if (!tunaDelete) {
                    return { ok: false, message: "No se elimino Tuna", response: null, code: 404 };
            }
             return { ok: true, message: "Tuna was successfully deleted", response: tunaDelete, code: 200 };
        }   catch (error) {
            
                logger.error("[tunaController/deleteTunaByCodet] " + error);
            return { ok: false, message: "Database error", response: null, code: 500 };
        } finally {          
            await this.mongoConn.disconnectDB(); 
        }
        }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        async getAllTuna():Promise<IResponse>{
            try {
                
                await this.mongoConn.connectDB();
                const tunaResponse= await ItemTuna.find()

                if (tunaResponse.length === 0) {
                    return { ok: false, message: "There are no products", response: null, code: 404 };
                }
                 return { ok: true, message: "All products are shown", response: tunaResponse, code: 200 };
            } catch (error) {
                
                logger.error("[tunaController/getAllTuna] " + error);
                return { ok: false, message: "Database error", response: null, code: 500 };
            } finally {
                await this.mongoConn.disconnectDB(); 

            }
            }
    
}   
