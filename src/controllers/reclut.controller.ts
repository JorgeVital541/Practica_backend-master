import { Model, model } from "mongoose";
import logger from "../../lib/logger";
import MongoConn from "../../lib/mongodb";
import IRecluta from "../interfaces/reclut.interface";
import IResponse from "../interfaces/response.interface";
import reclutModel from "../models/reclut.model";

export default class reclutControler{
    private mongoConn: MongoConn;
    constructor(){
        this.mongoConn = new MongoConn();
    }
    async saveReclut(reclut:IRecluta):Promise<IResponse>{
        try {
            if(!reclut){
                return ({ok:false,message:"Datos incorrecto", response: null, code: 400})
            }
            await this.mongoConn.connectDB();
            const reclutSave = await reclutModel.create(reclut);
            return ({ok:true,message:"Registro Guardado", response: reclutSave, code: 200})
        } catch (error) {
            logger.error("[reclutController/savereclut] " + error);
            return ({ok:false,message:"Error on DataBase", response: null, code: 500})
        }finally{
            await this.mongoConn.disconnectDB();
        }
    }
    async getReclut(workerid: any):Promise<IResponse>{
        try {

            await this.mongoConn.connectDB();
            const reclut = await reclutModel.find({workerid})
            if(reclut.length < 1){
                return ({ok:false,message:"No hay registro", response: null, code: 404})
            }
            return ({ok:true,message:"Registro encontrado", response: reclut, code: 200})
        } catch (error) {
            logger.error("[reclutController/saveProduct] " + error);
            return ({ok:false,message:"Error on DataBase", response: null, code: 500})
        }finally{
            await this.mongoConn.disconnectDB();
        }
    }
        async putReclut (id: any, recluts: IRecluta):(:promise<IRecluta>
        }
        try {
            const updatereclut = await Model.fin({Model}
              return ({ok:true,message:"Registro encontrado", response: reclut, code: 200})
   
            )  
        } catch (error) {
            logger.error("[reclutController/saveProduct] " + error);
            return ({ok:false,message:"Error on DataBase", response: null, code: 500})
        }finally{
            await this.mongoConn.disconnectDB();}
