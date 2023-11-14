import mongoose, {Schema} from "mongoose";

const boardSchema = new Schema(
    {
        name: {type: String, required: true},
        description: {type: String, required: true}
    },
    {
        timestamps: true
    }
)

const Board = mongoose.models.Board || mongoose.model("Board", boardSchema)

export default Board;