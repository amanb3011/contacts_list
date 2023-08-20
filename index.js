const express = require('express')
const path = require('path'); 
const port = 8000;


const app = express();

const db = require('./config/mongoose.js');
const Contact = require('./models/contact'); 


var contactList = [{
    name: "arpan",
    phone: "1111111111"
},
{
    name: "aman",
    phone: "9718877880"
},
{
    name: "messi",
    phone: "1234567890"
}
]
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

// app.use(function(req,res,next){
//     console.log('middleware 1 called');
//     next();
// });

app.get('/', function(req,res){
    Contact.find({})
    .then(contacts => 
        {return res.render('home', {
            title : "my contacts list",
            contact_list: contacts
    })
})
    .catch(err => {
            console.log('error in fetching',err);
            return;
    });
});

// app.get('/practice',function(req,res){
//     return res.render()
// })

app.post('/create-contact',function(req,res){
    // return res.redirect('/practice')
    // contactList.push(
    //     {
    //         name:req.body.name,
    //         phone:req.body.phone
    //     }
    // );
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }).then(result => {
        console.log(result);
    })
    .catch(err => {
        console.error(err);
    });
    return res.redirect('back');
//     return res.redirect('/');
});

app.get('/delete-contact/',function(req,res){
    const id = req.query.id;
    Contact.findByIdAndDelete(id)
    .then(()=>{
        return res.redirect('back');
    })
    .catch(err => {
        console.log(error);
});
});

app. listen(port,function(err){
    if(err){
        console.log(err);
        return;
    }
    console.log("server is up at port :",port);
});
