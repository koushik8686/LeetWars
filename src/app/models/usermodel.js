import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username:String,
    email:String,
    password:String,
    leetcode_id: String,
    avatar: String,
    comparisions:[{
        user1:String,
        user1_leetcode_id:String,
        user2:String,
        user2_leetcode_id:String,
    }],
    groups:[
     {
        group_name:String,
        group_members:[{
            user:String,
            leetcode_id:String
        }]
     }
    ]
})
const UserModel = mongoose.models.Users || mongoose.model("Users", userSchema);
export default UserModel;