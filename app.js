let express = require('express');
let pug = require('pug');
let mongoose = require('mongoose');
let MyError = require('./ControllerError/MyError');
let path = require('path');
let restRoute = require('./Routes/RestRoute');
let MainRoute = require('./Routes/MainRoute');
let Member = require('./models/Members');
let Sect = require('./models/Sects');


mongoose.connect('mongodb://localhost:27017/owuSect', {useNewUrlParser: true});

let port = 3000;

let app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// async function init(){
//     await Sect.deleteMany({})
// }
// init();

app.get('/', MainRoute);
app.use('/api', restRoute);

app.use((req, res, next)=>{
    next(new MyError('Not found page', 404))
});
app.use((err, req, res, next)=>{
    res.status(500)

});


app.listen(port , function (err) {
   if(err){
       console.log('uncorrect port');
   }else {
       console.log('Listening port ' + port + '...');
   }
});
