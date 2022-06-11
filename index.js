require("./global")
require('./db/mongoose')
const app = express()
const authMiddleware = require('./middleware/auth')
const authAdminMiddleware = require('./middleware/authAdmin')

const userRouter = require('./routes/user')
const productRouter = require("./routes/product")
const adminRouter = require("./routes/admin")

app.use(express.json())


app.use('/user',authMiddleware ,userRouter)
app.use('/product', productRouter)
app.use('/admin',authAdminMiddleware ,adminRouter)

app.listen(3000, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("server startrd on port 3000")
    }
})