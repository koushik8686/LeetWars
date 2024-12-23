import mongoose from "mongoose";
const statsschema = mongoose.Schema({
    users:{ type: Number, default: 0 }, 
    comparisions:{ type: Number, default: 0 },
    groups:{ type: Number, default: 0 }
})

const Stats = mongoose.models.statistics || mongoose.model('statistics', statsschema);
export default Stats;