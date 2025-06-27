const { sendEmail } = require('./sendEmail');


sendEmail({
    to: "vinay.1si19cs135@gmail.com",
    from: "vinay.1si19cs135@gmail.com",
    subject: "test Does this work?",
    text: "test If you are reading this ,.. then yes",
}).then(()=> console.log("Email Sent")).catch((err)=>console.log(err));