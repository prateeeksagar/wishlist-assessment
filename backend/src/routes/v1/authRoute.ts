import express from 'express'
import user from '../../controllers/user'
const router  = express.Router()

router.post('/signup', user.signup)
router.post('/login', user.login)
router.get('/isLoggedIn', user.isLoggedIn)

export default router;