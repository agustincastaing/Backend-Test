"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controllers_1 = require("../controllers/users-controllers");
const router = (0, express_1.Router)();
router.post('/signup', users_controllers_1.signUp);
router.get('/:id', users_controllers_1.getUserId);
exports.default = router;
