import express from 'express';
import { verifyRole, verifyToken } from '../middlewares/authMiddleware.js';
import { deleteUser, getUserById, getUsers, updateUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/users', verifyToken, getUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', verifyToken, verifyRole("admin"), updateUser);
router.delete('/users/:id', verifyToken, verifyRole("admin"), deleteUser);

export default router;