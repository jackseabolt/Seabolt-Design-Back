const express = require('express'); 
const app = express(); 
const bodyParser = require('body-parser'); 
const jsonParser = bodyParser.json(); 

app.post("/contact", jsonParser, (req, res) => {
    var api_key = 'key-f97937bb84680705a55914dad0c93217';
    var domain = 'sandboxc1770a2ad14b4f9ba4de9e6ece502492.mailgun.org';
    var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
     
    var data = {
      from: 'Seabolt Design <postmaster@sandboxc1770a2ad14b4f9ba4de9e6ece502492.mailgun.org>',
      to: 'jackseabolt@gmail.com',
      subject: `Message from ${req.body.name}`,
      text: 
        `Name: ${req.body.name} 
        Email: ${req.body.email} 
        Message: 
        req.body.message`
    };
     
    mailgun.messages().send(data, function (error, body) {
      console.log(body);
      if(!error) {
        res.send("Mail Sent")
      }
      else {
          res.send("There was a problem with Mailgun")
      }
    });
}); 



let server; 

function runServer() {
    const port = process.env.PORT || 8080
    return new Promise((resolve, reject) => {
        server = app.listen(port, () => {
            console.log('Your app is listening on port ' + port);
            resolve(server);  
        })
        .on('error', err => {
            reject(err)
        }); 
    }); 
}

function closeServer() {
    return new Promise((resolve, reject) => {
        server.close(err => {
            if(err) {
                reject(err); 
                return; 
            }
            resolve(); 
        }); 
    }); 
}

if (require.main === module) {
    runServer().catch(err => console.error(err))
}; 