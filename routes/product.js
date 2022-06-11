const router = new express.Router()
const Product = require('../mongooseModels/Product')

router.get('/allProducts', async (req, res) => {
    res.status(200).send(await Product.aggregate([
        {
            $match: {
                show: true
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'user'
            }
        },
        {
            $unwind: {
                path: '$user'
            }
        },
        {
            $project: {
                _id: 1,
                name: 1,
                price: 1,
                "user.name": 1,
                "user.email": 1
            }
        }
    ]))
})

module.exports = router