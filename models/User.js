const User = require('../mongooseModels/User')
const Product = require('../mongooseModels/Product')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
    async signUp(userData) {
        if (userData.name && userData.email && userData.password) {
            const duplicateUser = await User.findOne({
                email: userData.email
            })
            if (!duplicateUser || !duplicateUser._id) {
                var dataToSave = {
                    name: userData.name,
                    email : userData.email,
                    password: await bcrypt.hash(userData.password, 8),
                    _id: ObjectId()
                }
               var userDoc = new User(dataToSave)
               return await this.generateJwtToken(userDoc)
            } else {
                throw {
                    status: 400,
                    error: 'Email already exist'
                }
            }
        } else {
            throw {
                status: 400,
                error: 'Please send name, email and password',
            }
        }
    },

    async generateJwtToken(userData) {
        var token = jwt.sign({ _id: userData._id }, 'jwtkey')
        userData.token = token
        await userData.save()
        return { name: userData.name, email: userData.email, token }
    },

    async login(userData) {
        if (userData.email, userData.password) {
            const user = await User.findOne({
                email: userData.email
            })
            if (user && user._id) {
                var isMatch = await bcrypt.compare(userData.password, user.password)
                if (isMatch) {
                    return await this.generateJwtToken(user)
                } else {
                    throw {
                        status: 401,
                        error: 'Email or password is wrong'
                    }
                }
            } else {
                throw {
                    status: 401,
                    error: 'Email or password is wrong'
                }
            }
        } else {
            throw {
                status: 400,
                error: 'Please provide email and password'
            }
        }
    },

    async createProduct(productData, user) {
        if (productData.name && productData.price) {
            var productDataToSave = {
                name: productData.name,
                price: productData.price,
                userId: user._id
            }
            var productDoc = new Product(productDataToSave)
            return await productDoc.save()
        } else {
            throw {
                status: 400,
                error: 'Provide valid Product data'
            }
        }
    }
}