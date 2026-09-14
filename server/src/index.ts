import dotenv from "dotenv";
import app from "./app.js";
import chatRoutes
from "./modules/chat/chat.routes.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(
  "/api/v1/chat",
  chatRoutes
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});