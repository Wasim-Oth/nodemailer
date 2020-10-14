const express = require ('express')
const exphbs = require ('express-handlebars')
const bodyParser = require ('body-parser')
const path = require ('path')
const nodemailer = require ('nodemailer')


const app = express()

// view engine setup
app.engine('hbs', exphbs({ defaultLayout: false }))
app.set('view engine', 'hbs')

// body parser middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// static folder
app.use(express.static(path.join(__dirname, '/public')))


app.get('/', (req, res) => {
res.render('contact')
})

app.post('/send', (req,res) => {
    // console.log(req.body)
    const output = `
    <p> toy have new contact request</p>
    <h3>contact details</h3>
    <ul>
    <li>Name: ${req.body.name} </li>
    <li>Name: ${req.body.company} </li>
    <li>Name: ${req.body.email} </li>
    <li>Name: ${req.body.phone} </li>
    </ul>
    <h3> message </h3>
    <p> ${req.body.messsage} </p>
    `;

    // create reusable transporter opbject using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
       
        secure: false, 
        auth: {
            user: 'wasim.othman91@gmail.com', 
            pass: ''  
        },
        tls:{
          rejectUnauthorized:false
        }
      });
    
      // setup email data with unicode symbols
      let mailOptions = {
          from: '"Nodemailer Contact" <wasim.othman91@gmail.com>', // sender address
          to: 'wasim1991othman@gmail.com', // list of receivers
          subject: 'Node Contact Request', 
          text: 'Hello world?', 
          html: output // html body
      };
    
      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message sent: %s', info.messageId);   
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    
          res.render('contact', {msg:'Email has been sent'});
          
    })

})

app.listen(3000, () => console.log('server is running...'))