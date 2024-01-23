const nodemailer = require("nodemailer")
exports.sendEmail = (req, res) => {
    try {
        const transport = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 465,
            auth: {
                user: "kritisinha902@gmail.com",
                pass: "uphh nuuo mgpn lmcm"
            }
        })
        const data = {
            from: "kritisinha902@gmail.com",
            to: req.body.email,
            subject: req.subject,
            text: req.text

        }
        transport.sendMail(data, (error, info) => {
            if (error) {
                console.log(error);
                res.status(400).json({ message: "Email Delivery Error" })
            } else {
                console.log(info);
                res.status(200).json({ message: "success" })
            }
        })
    } catch (error) {
        res.status(400).json({ message: "Internal Email Delivery Error" })
    }
}