import mongoose from "mongoose";

const RouteSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  path: { type: String, required: true, unique: true },
});

// export default mongoose.model("Route", RouteSchema);

const Route = mongoose.models.Route || mongoose.model("Route", RouteSchema);

export default Route;
