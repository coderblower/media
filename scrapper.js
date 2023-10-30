
const helper = require('./helper')
const mongoose = require('mongoose');
const Media = require('./model/Media')
mongoose.connect("mongodb+srv://saiful:saif1994@cluster0.vxj27.mongodb.net/bnm?retryWrites=true&w=majority")


helper.callScrapFn({Media})



