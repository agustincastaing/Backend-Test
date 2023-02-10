"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controllers_1 = require("../controllers/users-controllers");
const router = (0, express_1.Router)();
const userController = new users_controllers_1.UserController();
// router.get("/clients/:id?", userController.clients);
// router.get("/", userController.getUser);
// router.post("/", userController.postUser);
exports.default = router;
