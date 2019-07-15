const express = require('express')
const { join } = require('path')
const passport = require('passport')
const { Strategy } = require('passport-local')
const { Strategy: JWTStrategy, ExtractJwt } = require('passport-jwt')
const { User } = require('./models')
const app = express()

app.use(express.static(join(__dirname, 'client', 'build')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(multer({
    dest: './uploads',
    rename: function (fieldname, filename) {
        return filename;
    },
}));

app.use(require('express-session')({
    secret: 'hotdog',
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

passport.use(new Strategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'hotdog'
}, (jwtPayload, cb) => User.findById(jwtPayload.id)
    .then(user => cb(null, user))
    .catch(err => cb(err, null))
))

require('./routes')(app)

require('mongoose').connect('mongodb://localhost:27017/posme_db', { useNewUrlParser: true, useFindAndModify: true, useCreateIndex: true })
    .then(_ => app.listen(process.env.PORT || 3001))
    .catch(e => console.log(e))