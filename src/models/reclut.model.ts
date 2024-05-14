import mongoose, { Schema } from "mongoose";

const reclutSchema: Schema = new Schema({
        
    name: { type:String, require: true},
    lastname:{ type:String, require: true},
    birtdate: { type:String, require: true},
    position: { type:String, require: true, enum: ["facturista, cocinero, gerente, mantenimineto"]},
    workerid: { type:String, require: true}
}, {collection: 'recluta'})

export default mongoose.model('recluta',reclutSchema)