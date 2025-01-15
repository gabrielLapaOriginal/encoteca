"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const book_route_js_1 = __importDefault(require("./routes/book.route.js"));
const author_route_js_1 = __importDefault(require("./routes/author.route.js"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const swagger_js_1 = __importDefault(require("./utils/swagger.js"));
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 3000;
//middleware
app.use(express_1.default.json());
//routes
app.use("/api", book_route_js_1.default);
app.use("/api", author_route_js_1.default);
app.get(`/`, (req, res) => {
    res.send("Hello from node api");
});
mongoose_1.default.connect(process.env.MONGO_URI)
    .then(() => {
    console.log("Connected to database!");
    app.listen(PORT, () => {
        console.log("Server is running on port 3000");
        (0, swagger_js_1.default)(app, PORT);
    });
})
    .catch(() => {
    console.log("Connection failed");
});
