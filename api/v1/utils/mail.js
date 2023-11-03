import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "brayoh5454@gmail.com",
    pass: "vijm dejr opfo rjnm",
  },
});

const main = async (to, subject, message) => {
  // SEND EMAIL
  await transporter.sendMail({
    from: "'Fazilabs' <brayoh5454@gmail.com>", //sender address
    to: to, //list of receivers separated by comma
    subject: subject, //SUBJECT LINE
    html: message, //HTML BODY
  });

  return true;
};

export default main;
