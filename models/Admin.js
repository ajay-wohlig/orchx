const User = require('../mongooseModels/User')
const Product = require('../mongooseModels/Product')

module.exports = {
    async updateProduct (data) {
        var dataToUpdate = {}
        if (data.name) dataToUpdate.name = data.name
        if (data.price) dataToUpdate.price = data.price
        if (data.show) dataToUpdate.show = data.show

        var updatedData = await Product.updateOne({
            _id: data.id
        },
        {
            $set: dataToUpdate
        })
        return updatedData && updatedData.modifiedCount == 1 ?  "Product Updated" : "Product not updated"
    },

    async deleteProduct(data) {
        var deleteData = await Product.deleteOne({
            _id: data.id
        })

        return deleteData && deleteData.deletedCount == 1 ? "Product Deleted" : "Product not Deleted"
    },

    async updateUser(data) {
        var dataToUpdate = {}
        if (data.name) dataToUpdate.name = data.name
        if (data.email) dataToUpdate.price = data.email

        var updatedData = await User.updateOne({
            _id: data.id
        },
        {
            $set: dataToUpdate
        })
        return updatedData && updatedData.modifiedCount == 1 ?  "User Updated" : "User not updated"
    },

    async deleteUser(data) {
        const user = await User.findOne({
            _id: data.id
        })

        if (user && user._id) {
            const deleteUserProducts = await Product.deleteMany({
                userId: data.id
            })

            const deletedUser = await User.deleteOne({
                _id: data.id
            })
            return deletedUser && deletedUser.deletedCount == 1 ? "User Deleted" : "User not Deleted"
        } else {
            throw {
                status: 400,
                error: "User not found"
            }
        }
    }
}