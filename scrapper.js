
const helper = require('./helper')
const mongoose = require('mongoose');
const Embassy = require('./model/Embassy')
mongoose.connect("mongodb+srv://saiful:saif1994@cluster0.vxj27.mongodb.net/embassy?retryWrites=true&w=majority")


helper.callScrapFn(Embassy)



