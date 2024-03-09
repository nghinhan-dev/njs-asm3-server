const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

const mailContent = (user, address, cart, total) => `
    <div>
    <h1>GM ${user.userName}</h1>
        <h3>Phone Number: ${user.phoneNumber}</h3>
        <h3>Address: ${address}</h3>
<p>Here is you order details:</p>
        <table>
          <thead>
          <tr style="border: 1px solid #dddddd; padding: 8px;">
              <th>Product</th>
              <th>Image</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Cost</th>
          </tr>
          </thead>
          <tbody>
              ${cart
                .map(
                  (product) => `
                <tr style="border: 1px solid #dddddd; padding: 8px;">
                  <td>${product.item.name}</td>
                  <td><img src="${
                    product.item.img1
                  }" alt="Product Image" width="auto" height="100"></td>
                  <td>${product.item.price
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</td>
                  <td>${product.quantity}</td>
                  <td>${(product.quantity * +product.item.price)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
                
          <h2>Total Bill: ${total.toLocaleString()} VND</h2>
          <p>Thank you very much for your support</p>
      </div>
                `;

// async..await is not allowed in global scope, must use a wrapper
async function sendMail(user, address, total, cart) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `Sillywhale 👻" <${process.env.EMAIL}>`, // sender address
    to: user.email, // list of receivers
    subject: "ORDER INFORMATION",
    html: mailContent(user, address, cart, total), // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

module.exports = { sendMail };
