const router = new express.Router()
const AdminModel = require('../models/Admin')


router.post('/updateProduct', async (req, res) => {
    try {
        res.status(200).json(await AdminModel.updateProduct(req.body))
    } catch (err) {
        if (err.status) {
            res.status(err.status).json(err)
        } else {
            res.status(500).json(err)
        }
    }
})

router.post('/deleteProduct', async (req, res) => {
    try {
        res.status(200).json(await AdminModel.deleteProduct(req.body))
    } catch (err) {
        if (err.status) {
            res.status(err.status).json(err)
        } else {
            res.status(500).json(err)
        }
    }
})

router.post('/updateUser', async (req, res) => {
    try {
        res.status(200).json(await AdminModel.updateUser(req.body))
    } catch (err) {
        if (err.status) {
            res.status(err.status).json(err)
        } else {
            res.status(500).json(err)
        }
    }
})

router.post('/deleteUser', async (req, res) => {
    try {
        res.status(200).json(await AdminModel.deleteUser(req.body))
    } catch (err) {
        if (err.status) {
            res.status(err.status).json(err)
        } else {
            res.status(500).json(err)
        }
    }
})

module.exports = router