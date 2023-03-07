import authController from "@/controllers/auth.controller";
import express from "express";
import passport from 'passport';
import helloController from "../controllers/hello.controller";
import asyncErrorMiddleware from "../middlewares/asyncError.middleware";

const router = express.Router();

// Routes for database
// Configurar rutas
router.post('/login',
  passport.authenticate('local', { failureRedirect: '/login-failure' }),
  (req, res) => {
    res.redirect('/login-success');
  });

router.get('/login-success', (req, res) => {
  res.send('Login successful');
});

router.get('/login-failure', (req, res) => {
  res.send('Incorrect username or password');
});


export default router;
