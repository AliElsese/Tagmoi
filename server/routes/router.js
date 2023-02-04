const express   = require('express');
const route     = express.Router();
const multer = require('multer');
const storage = multer.diskStorage({
    destination : (req , file , cb) => {
        cb(null , './server/uploads')
    },

    filename : (req , file , cb) => {
        cb(null , file.originalname)
    }
})
const upload = multer({ storage : storage })

// Middlewares
const { requireLogin } = require('./middleware')

// Controllers
const headerController       = require('../controllers/header-controller')

// Services
const controlPanalRender     = require('../services/controlPanal-render')

// Site Render
route.get('/features-share' , (req,res) => {
    res.render('features-share')
})
route.get('/features-control' , (req,res) => {
    res.render('features-control')
})
route.get('/features-contact' , (req,res) => {
    res.render('features-contact')
})

// APIS
route.post('/addHeaderSection' , headerController.addSection)
route.post('/editHeaderSection' , headerController.editSection)
route.post('/sectionVisiblity' , headerController.sectionVisiblity)
route.post('/sectionDelete' , headerController.deleteSection)
route.post('/updateLogo' , upload.single('logo_image') , headerController.updateLogo)
route.post('/addAnnouncement' , headerController.addAnnouncement)
route.post('/updateAnnouncement' , headerController.updateAnnouncement)
route.post('/deleteAnnouncement' , headerController.deleteAnnouncement)
route.post('/addSubSection' , headerController.addSubSection)
route.post('/editSubSection' , headerController.editSubSection)
route.post('/subSectionVisiblity' , headerController.subSectionVisiblity)
route.post('/SubSectionDelete' , headerController.deleteSubSection)

// ControlPanal Render
route.get('/login' , controlPanalRender.showLoginPage)
route.post('/websiteLogin' , controlPanalRender.websiteLogin)
route.get('/header' , requireLogin , controlPanalRender.showHeaderPage)
route.get('/logo' , requireLogin , controlPanalRender.showLogoPage)
route.get('/announcment-bar' , requireLogin , controlPanalRender.showAnnouncmentBarPage)
route.get('/:section_name' , requireLogin , controlPanalRender.showSectionPage)

route.get('/web-app' , requireLogin , controlPanalRender.showWebAppPage)
route.get('/shopping-pageTitle' ,requireLogin , controlPanalRender.showShoppingPageTitlePage)
route.get('/shopping-products' , requireLogin , controlPanalRender.showShoppingProductsPage)
route.get('/blog' , requireLogin , controlPanalRender.showBlogPage)
route.get('/blog-pageTitle' , requireLogin , controlPanalRender.showBlogPageTitlePage)
route.get('/blog-articls' , requireLogin , controlPanalRender.showBlogArticlesPage)
route.get('/footer' , requireLogin , controlPanalRender.showFooterPage)
route.get('/download-app' , requireLogin , controlPanalRender.showDownloadAppPage)
route.get('/site-map' , requireLogin , controlPanalRender.showSiteMapPage)
route.get('/home' , requireLogin , controlPanalRender.showHomePage)
route.get('/home-pageTitle' , requireLogin , controlPanalRender.showHomePageTitlePage)
route.get('/features' , requireLogin , controlPanalRender.showFeaturesPage)
route.get('/features-pageTitle' , requireLogin , controlPanalRender.showFeaturesPageTitlePage)
route.get('/help' , requireLogin , controlPanalRender.showHelpPage)
route.get('/help-pageTitle' , requireLogin , controlPanalRender.showHelpPageTitlePage)

module.exports = route