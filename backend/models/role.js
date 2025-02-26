 

// import mongoose from "mongoose";

// const RoleSchema = new mongoose.Schema({
//   role: { type: String, required: true  },
// });

// export default mongoose.model("Role", RoleSchema);


// models/role.js
import mongoose from 'mongoose';

const RoleSchema = new mongoose.Schema({
  role: { type: String, required: true },
  routes: [{ type: String, default: [] }],
});


export default mongoose.model('Role', RoleSchema)

