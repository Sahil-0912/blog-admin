const { createTransport } = require("nodemailer");

const transprt = createTransport({
    service: "gmail",
    auth: {
        user: "sahilvaghela975@gmail.com",
        pass: "nnng bgop gwwk jmuz"
    }
})

async function sendemail(to, subject, html) {
    const option = {
        from: "sahilvaghela975@gmail.com",
        to: to,
        subject: subject,
        // text: "good evening",
        html: html
    }

    await transprt.sendMail(option, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log("send mail");
        }
    })
}

module.exports = sendemail