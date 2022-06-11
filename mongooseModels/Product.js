var schema = new mongoose.Schema(
    {
        name: {
            type: String
        },
        price: {
            type: Number
        },
        show: {
            type: Boolean,
            default: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Product', schema)