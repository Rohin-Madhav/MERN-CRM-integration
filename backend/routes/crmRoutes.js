const router = require('express').Router()
const auth = require('../middilwares/authMiddileware')
const crmRoutes = require('../controllers/crmControllers')


router.post("/register",crmRoutes.registerUser)
router.post("/login",crmRoutes.loginUser)
router.get("/customers",auth,crmRoutes.getCustomer)
router.post("/customers",auth,crmRoutes.addCustomer)
router.patch("/customer/:id",auth,crmRoutes.updateCustomer)
router.delete("/delcustomer/:id",crmRoutes.deleteCustomer)

module.exports = router