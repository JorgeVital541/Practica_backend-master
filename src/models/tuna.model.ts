import mongoose, { Schema } from "mongoose";
const tunaSchema: Schema = new Schema({
        
    name: { type:String, require: true},
    description:{ type:String, require: true},
    type: { type:String, require: true},
    lot: { type:String, require: true},
    codet: { type:Number, require: true},
    qty: { type:Number, require: true}
}, {collection: 'tuna'})

const Tunam = mongoose.model('Tuna',tunaSchema)

export default Tunam