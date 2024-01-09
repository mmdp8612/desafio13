import passport from "passport";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { config } from "../config/config.js";
import { usersService } from "../services/UsersServices.js";


const transporter = nodemailer.createTransport({
    host: 'c2071475.ferozo.com', 
    port: 465, 
    secure: true,
    auth: {
      user: 'info@pandaweb.ar',
      pass: 'Mmdp@8612' 
    }
});

const login = async (req, res, next) => {
    passport.authenticate('login', (err, user, info) => {
        if (err) {
            req.logger.error(err.message)
            return res.status(500).json({ success: false, message: 'An error occurred', error: err.message });
        }
        if (!user) {
            req.logger.error(info.message)
            return res.status(400).json({ success: false, message: 'Login failed', error: info.message, validationErrors: '' });
        }

        const token = jwt.sign({ _id: user._id, role: user.role, email: user.email }, config.SECRET_KEY);

        return res.json({ success: true, message: 'Login successful', user, token });
    })(req, res, next);
}

const register = async (req, res, next) => {
    passport.authenticate('register', (err, user, info) => {
        if (err) {
            req.logger.error(err.message)  
            return res.status(500).json({ success: false, message: 'An error occurred', error: err.message });
        }
        if (!user) {
            req.logger.error(info.message)
            return res.status(400).json({ success: false, message: 'Registration failed', error: info.message, validationErrors: '' });
        }
        return res.json({ success: true, message: 'Registration successful', user });
    })(req, res, next);
}

const github = async (req, res, next) => {
    passport.authenticate('github',{})(req, res, next);
}

const callbackGithub = async (req, res, next) => {
    passport.authenticate('github', (err, user, info) => {
        if(err){
            req.logger.error(err.message)
            return res.redirect('/api/auth/errorGitHub');
        }

        req.session.user = {
            _id: user._id,
            first_name: user.name,
            email: user.email
        }

        return res.redirect('/view/products');
    })(req, res, next);
}

const errorGithub = async (req, res, next) => {
    res.setHeader('Content-Type','application/json');
    res.status(200).json({
        error:'Error en Github'
    });
}

const olvido = async (req, res, next) => {
    const { email } = req.body;
    const token = crypto.randomBytes(20).toString('hex'); 
 
    global.passwordResetTokens[token] = { email, createdAt: Date.now(), expires: Date.now() + 3600000 };

    const resetLink = `<a href="http://localhost:${config.PORT}/view/recuperar/${token}" target="_blank">Link de recuperacion</a>`; 

    const mailOptions = {
        from: 'info@pandaweb.ar',
        to: email,
        subject: 'Restablecer contraseña',
        html: `
            <h4>Restablecer contraseña</h4>
            <p>Para recuperar su contraseña haga click en el siguiente link: ${resetLink}</p>
        `
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          res.status(500).json({
            success: false,
            message: 'Error al enviar el correo'
          });
        } else {
          res.status(200).json({
            success: true,
            message: 'Correo enviado'
          });
        }
    });
}

const recuperar = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        await usersService.updatePassword(email, password); 
        return res.status(200).json({
            success: true,
            message: 'Password actualizada!'
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error.message
        });   
    }
}

export {
    login,
    register,
    github,
    callbackGithub,
    errorGithub,
    olvido,
    recuperar
}