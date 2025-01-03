const mongoose=require("mongoose")
const notesSchema=new mongoose.Schema({
    title:String,
    body:String,
    notesImage:{
        type:String,
        default:"https://img.freepik.com/free-vector/cute-notebook-cartoon-funny-turquoise-diary_105738-1260.jpg"
    },
    userId:{
        type:String,
        required:true
    }
},{
    versionKey:false,
    timestamps:true
}
)

const notesModel=mongoose.model("notes",notesSchema)

module.exports=notesModel
