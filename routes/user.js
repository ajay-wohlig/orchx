const router = new express.Router()
const UserModel = require('../models/User')

router.post('/signup', async (req, res) => {
    try {
        res.status(200).json(await UserModel.signUp(req.body))
    } catch (err) {
        if (err.status) {
            res.status(err.status).json(err)
        } else {
            res.status(500).json(err)
        }
    }
})

router.post('/login', async (req, res) => {
    try {
        res.status(200).json(await UserModel.login(req.body))
    } catch (err) {
        console.log(err)
        if (err.status) {
            res.status(err.status).json(err)
        } else {
            res.status(500).json(err)
        }
    }
})

router.post('/createProduct', async (req, res) => {
    try {
        res.status(200).json(await UserModel.createProduct(req.body, req.user))
    } catch (err) {
        console.log(err)
        if (err.status) {
            res.status(err.status).json(err)
        } else {
            res.status(500).json(err)
        }
    }
})

module.exports = router