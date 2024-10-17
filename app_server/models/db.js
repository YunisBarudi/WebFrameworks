const mongoose = require('mongoose');
const dbURI = "mongodb+srv://yunisbarudi:unis1unis@cluster.ihitu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster";
try {
mongoose.connect(
dbURI,
{ useNewUrlParser: true, useUnifiedTopology: true }).then(
() => {console.log(" Mongoose is connected")},
err=> {console.log(err)}
);
}
catch (e) {
console.log("could not connect");
}
require('./locations');