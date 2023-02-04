const connectDB = require('../database/connection')

module.exports = {
    addSection : (req,res) => {
        let section = {
            section_arName : req.body.section_ar,
            section_enName : req.body.section_en
        }
        connectDB.query('INSERT INTO sections SET ?' , [section] , (err,result) => {
            if (err) res.send(err)
            else {
                res.redirect('header')
            }
        })
    },

    editSection : (req,res) => {
        let section = {
            section_arName : req.body.section_ar,
            section_enName : req.body.section_en
        }
        connectDB.query('UPDATE sections SET ? WHERE section_id = ?' , [section,req.body.section_id] , (err,result) => {
            if (err) res.send(err)
            else {
                res.redirect('header')
            }
        })
    },

    sectionVisiblity : (req,res) => {
        let sectionId = req.body.section_id
        connectDB.query('SELECT section_status FROM sections WHERE section_id = ?' , [sectionId] , (err,section) => {
            if (err) res.send(err)
            else if (section[0].section_status == 'true') {
                let sectionStatus = 'false'
                connectDB.query('UPDATE sections SET section_status = ? WHERE section_id = ?' , [sectionStatus,sectionId] , (err,results) => {
                    if (err) res.send(err)
                    else {
                        res.redirect('header')
                    }
                })
            }
            else {
                let sectionStatus = 'true'
                connectDB.query('UPDATE sections SET section_status = ? WHERE section_id = ?' , [sectionStatus,sectionId] , (err,results) => {
                    if (err) res.send(err)
                    else {
                        res.redirect('header')
                    }
                })
            }
        })
    },

    deleteSection : (req,res) => {
        connectDB.query('DELETE FROM sections WHERE section_id = ?' , [req.body.section_id] , (err,results) => {
            if (err) res.send(err)
            else {
                connectDB.query('DELETE FROM subsections WHERE section_id = ?' , [req.body.section_id] , (err,result) => {
                    if (err) res.send(err)
                    else {
                        res.redirect('header')
                    }
                })
            }
        })
    },

    updateLogo : (req,res) => {
        let id = req.body.logo_id,
            image = `server/uploads/${req.file.filename}`

        connectDB.query('UPDATE logo SET logo_image = ? WHERE logo_id = ?' , [image,id] , (err,results) => {
            if (err) res.send(err)
            else {
                res.redirect('logo')
            }
        })
    },

    addAnnouncement : (req,res) => {
        if (req.body.actionName == 'saved') {
            let announcement = {
                ann_title : req.body.ann_title,
                ann_text : req.body.ann_text,
                ann_link : req.body.ann_link,
                ann_color : req.body.font_color,
                ann_bgcolor : req.body.background_color,
                ann_status : 'saved'
            }
            connectDB.query('INSERT INTO announcements SET ?' , [announcement] , (err,results) => {
                if (err) res.send(err)
                else {
                    res.redirect('announcment-bar')
                }
            })
        }
        else {
            let announcement = {
                ann_title : req.body.ann_title,
                ann_text : req.body.ann_text,
                ann_link : req.body.ann_link,
                ann_color : req.body.font_color,
                ann_bgcolor : req.body.background_color,
                ann_status : 'published'
            }
            connectDB.query('INSERT INTO announcements SET ?' , [announcement] , (err,results) => {
                if (err) res.send(err)
                else {
                    res.redirect('announcment-bar')
                }
            })
        }
    },

    updateAnnouncement : (req,res) => {
        let annID = req.body.ann_id
        if (req.body.actionName == 'saved') {
            let announcement = {
                ann_title : req.body.ann_title,
                ann_text : req.body.ann_text,
                ann_link : req.body.ann_link,
                ann_color : req.body.font_color,
                ann_bgcolor : req.body.background_color,
                ann_status : 'saved'
            }
            connectDB.query('UPDATE announcements SET ? WHERE ann_id = ?' , [announcement,annID] , (err,results) => {
                if (err) res.send(err)
                else {
                    res.redirect('announcment-bar')
                }
            })
        }
        else {
            let announcement = {
                ann_title : req.body.ann_title,
                ann_text : req.body.ann_text,
                ann_link : req.body.ann_link,
                ann_color : req.body.font_color,
                ann_bgcolor : req.body.background_color,
                ann_status : 'published'
            }
            connectDB.query('UPDATE announcements SET ? WHERE ann_id = ?' , [announcement,annID] , (err,results) => {
                if (err) res.send(err)
                else {
                    res.redirect('announcment-bar')
                }
            })
        }
    },

    deleteAnnouncement : (req,res) => {
        connectDB.query('DELETE FROM announcements WHERE ann_id = ?' , [req.body.ann_id] , (err,results) => {
            if (err) res.send(err)
            else {
                res.redirect('announcment-bar')
            }
        })
    },

    addSubSection : (req,res) => {
        let section = {
            section_id : req.body.section_id,
            sb_arName : req.body.section_ar,
            sb_enName : req.body.section_en
        }
        connectDB.query('INSERT INTO subsections SET ?' , [section] , (err,result) => {
            if (err) res.send(err)
            else {
                connectDB.query('SELECT * FROM sections WHERE section_id = ?' , [section.section_id] , (err,sections) => {
                    if (err) res.send(err)
                    else {
                        res.redirect(`/${sections[0].section_enName}`)
                    }
                })
            }
        })
    },

    editSubSection : (req,res) => {
        let section = {
            sb_arName : req.body.section_ar,
            sb_enName : req.body.section_en
        }
        connectDB.query('SELECT section_id FROM subsections WHERE sb_id = ?' , [req.body.section_id] , (err,subsection) => {
            if (err) res.send(err)
            else {
                connectDB.query('SELECT * FROM sections WHERE section_id = ?' , [subsection[0].section_id] , (err,sections) => {
                    if (err) res.send(err)
                    else {
                        connectDB.query('UPDATE subsections SET ? WHERE sb_id = ?' , [section,req.body.section_id] , (err,result) => {
                            if (err) res.send(err)
                            else {
                                res.redirect(`/${sections[0].section_enName}`)
                            }
                        })
                    }
                })
            }
        })
    },

    subSectionVisiblity : (req,res) => {
        let sectionId = req.body.section_id
        connectDB.query('SELECT section_id FROM subsections WHERE sb_id = ?' , [sectionId] , (err,subsection) => {
            if (err) res.send(err)
            else {
                connectDB.query('SELECT * FROM sections WHERE section_id = ?' , [subsection[0].section_id] , (err,sections) => {
                    if (err) res.send(err)
                    else {
                        connectDB.query('SELECT sb_status FROM subsections WHERE sb_id = ?' , [sectionId] , (err,section) => {
                            if (err) res.send(err)
                            else if (section[0].sb_status == 'true') {
                                let sectionStatus = 'false'
                                connectDB.query('UPDATE subsections SET sb_status = ? WHERE sb_id = ?' , [sectionStatus,sectionId] , (err,results) => {
                                    if (err) res.send(err)
                                    else {
                                        res.redirect(`/${sections[0].section_enName}`)
                                    }
                                })
                            }
                            else {
                                let sectionStatus = 'true'
                                connectDB.query('UPDATE subsections SET sb_status = ? WHERE sb_id = ?' , [sectionStatus,sectionId] , (err,results) => {
                                    if (err) res.send(err)
                                    else {
                                        res.redirect(`/${sections[0].section_enName}`)
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    },

    deleteSubSection : (req,res) => {
        connectDB.query('SELECT section_id FROM subsections WHERE sb_id = ?' , [req.body.section_id] , (err,subsection) => {
            if (err) res.send(err)
            else {
                connectDB.query('SELECT * FROM sections WHERE section_id = ?' , [subsection[0].section_id] , (err,sections) => {
                    if (err) res.send(err)
                    else {
                        connectDB.query('DELETE FROM subsections WHERE sb_id = ?' , [req.body.section_id] , (err,result) => {
                            if (err) res.send(err)
                            else {
                                res.redirect(`/${sections[0].section_enName}`)
                            }
                        })
                    }
                })
            }
        })
    },
}