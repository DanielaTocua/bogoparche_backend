import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import pool from '../database/pool';

export default function configurePassport(passport: any) {
    passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
        const { rows } = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        const user = rows[0];
        console.log(rows)

        if (!user) {
            return done(null, false, { message: 'Incorrect username or password.'});
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return done(null, false, { message: 'Incorrect username or password.' });
        }

        return done(null, user);
        } catch (error) {
        return done(error);
        }
    })
    );
}

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: any, done) => {
  try {
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    const user = rows[0];
    done(null, user);
  } catch (error) {
    done(error);
  }
});

