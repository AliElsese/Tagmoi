const connectDB = require('../database/connection')
const jwt       = require('jsonwebtoken')
const axios     = require('axios')

// Create Token
const createToken = (id) => {
    return jwt.sign( {id} , process.env.JWT_SECRET , {
        expiresIn : process.env.JWT_EXPIRES_IN
    })
}

module.exports = {
    showLoginPage : (req,res) => {
        res.render('website-login')
    },

    websiteLogin : (req,res) => {
        if (!req.body.username || !req.body.password) {
            res.render('website-login' , {
                message : 'Fill All Inputs'
            })
        }
        else {
            connectDB.query('SELECT * FROM members WHERE member_email = ?' , [req.body.username] , (err,member) => {
                if (err) res.send(err)
                else if (!member || member.length == 0) {
                    res.render('website-login' , {
                        message : 'Incorrect Email'
                    })
                }
                else {
                    if (req.body.password != member[0].member_password) {
                        res.render('website-login' , {
                            message : 'Incorrect Password'
                        })
                    }
                    else {
                        const token = createToken(member[0].member_id)
                        const cookieOptions = {
                            expires : new Date(
                                Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                            ),
                            httpOnly : false
                        }

                        res.cookie('jwt' , token , cookieOptions)
                        res.redirect('header')
                    }
                }
            })
        }
    },

    showHeaderPage : (req,res) => {
        connectDB.query('SELECT * FROM sections' , (err,sections) => {
            if (err) res.send(err)
            else {
                connectDB.query('SELECT * FROM subsections' , (err,sbsections) => {
                    if (err) res.send(err)
                    else {
                        res.render('header' , {
                            sections : sections,
                            sbsections : sbsections
                        })
                    }
                })
            }
        })
    },

    showLogoPage : (req,res) => {
        connectDB.query('SELECT * FROM sections' , (err,sections) => {
            if (err) res.send(err)
            else {
                connectDB.query('SELECT * FROM subsections' , (err,sbsections) => {
                    if (err) res.send(err)
                    else {
                        connectDB.query('SELECT * FROM logo' , (err,logo) => {
                            res.render('logo' , {
                                sections : sections,
                                sbsections : sbsections,
                                logo : logo
                            })
                        })
                    }
                })
            }
        })
    },

    showAnnouncmentBarPage : (req,res) => {
        connectDB.query('SELECT * FROM sections' , (err,sections) => {
            if (err) res.send(err)
            else {
                connectDB.query('SELECT * FROM subsections' , (err,sbsections) => {
                    if (err) res.send(err)
                    else {
                        connectDB.query('SELECT * FROM announcements' , (err,announcements) => {
                            if (err) res.send(err)
                            else {
                                res.render('announcment-bar' , {
                                    sections : sections,
                                    sbsections : sbsections,
                                    announcements : announcements
                                })
                            }
                        })
                    }
                })
            }
        })
    },

    showSectionPage : (req,res) => {
        connectDB.query('SELECT * FROM sections WHERE section_enName = ?' , [req.params.section_name] , (err,section) => {
            if (err) res.send(err)
            else {
                connectDB.query('SELECT * FROM sections' , (err,sections) => {
                    if (err) res.send(err)
                    else {
                        connectDB.query('SELECT * FROM subsections' , (err,sbsections) => {
                            if (err) res.send(err)
                            else {
                                res.render('home' , {
                                    sections : sections,
                                    sbsections : sbsections,
                                    section : section
                                })
                            }
                        })
                    }
                })
            }
        })
    },

    showWebAppPage : (req,res) => {
        res.render('web-app')
    },

    showShoppingPageTitlePage : (req,res) => {
        res.render('shopping-pageTitle')
    },

    showShoppingProductsPage : (req,res) => {
        res.render('shopping-products')
    },

    showBlogPage : (req,res) => {
        res.render('blog')
    },

    showBlogPageTitlePage : (req,res) => {
        res.render('blog-pageTitle')
    },

    showBlogArticlesPage : (req,res) => {
        res.render('blog-articles')
    },

    showFooterPage : (req,res) => {
        res.render('footer')
    },

    showDownloadAppPage : (req,res) => {
        res.render('download-app')
    },

    showSiteMapPage : (req,res) => {
        res.render('site-map')
    },

    showHomePage : (req,res) => {
        res.render('home')
    },

    showHomePageTitlePage : (req,res) => {
        res.render('home-pageTitle')
    },

    showFeaturesPage : (req,res) => {
        res.render('features')
    },

    showFeaturesPageTitlePage : (req,res) => {
        res.render('features-pageTitle')
    },

    showHelpPage : (req,res) => {
        res.render('help')
    },

    showHelpPageTitlePage : (req,res) => {
        res.render('help-pageTitle')
    }
}