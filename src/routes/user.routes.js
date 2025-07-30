import express from "express";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import {getAllUsers,getUserById,updateUser,updatePassword,deleteUser} from "../controllers/user.controller.js";

import {updateUserValidation,updatePasswordValidation} from "../middlewares/validators/userValidator.js";

const router = express.Router();

router.use(authenticateToken);

router.get("/user", getAllUsers);
router.get("/user/:id", getUserById);
router.put("/user/:id", updateUserValidation, updateUser);
router.put("/users/:id/password", updatePasswordValidation, updatePassword);
router.delete("/user/:id", deleteUser);

export default router;
