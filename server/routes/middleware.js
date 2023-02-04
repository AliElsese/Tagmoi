const connectDB = require('../database/connection')
const jwt       = require('jsonwebtoken')

const requireLogin = (req,res,next) => {
    const token = req.cookies.jwt

    if (token) {
        jwt.verify(token , process.env.JWT_SECRET , (err,decodedToken) => {
            if (err) {
                res.redirect('/login')
            }
            else {
                connectDB.query('SELECT * FROM members WHERE member_id = ?' , [decodedToken.id] , (err,member) => {
                    if (err) {
                        res.send(err)
                    }
                    else {
                        res.locals.member_id = member[0].member_id
                        res.locals.member_email = member[0].member_email
                        res.locals.member_role = member[0].member_role
                        next()
                    }
                })
            }
        })
    }
    else {
        res.redirect('/login')
    }
}

module.exports = { requireLogin }