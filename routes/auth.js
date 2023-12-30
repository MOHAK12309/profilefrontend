const express = require('express');
const router=express.Router()
const auth = require('./../controllers/authController');


router.post('/signup', auth.signup)
router.post('/login', auth.login)
router.patch('/update/:id', auth.updateUser)

router.get('/logout',auth.logout);
router.post('/verify',auth.verify);

router.post('/forgot',auth.forgotPassword);
router.post('/reset/:token',auth.reset);
router.get('/getOneuser/:id',auth.getOneuser);
module.exports = router