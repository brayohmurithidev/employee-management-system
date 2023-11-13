//RESET PASSWORD EMAIL
export const reset_password_template = (name, userEmail, password) => {
  return `
  <h2 style="color: green">Hi ${name}</h2>
  <p>Your employee details have been recorded and below are your login details to your user account:</p>
  <h4>Login :  <a>http://localhost:3000/login</a> </h4>
  <h4>Username: <span style="font-size: 10px">${userEmail}</span> </h4> 
  <h4>Password: <span style="font-size: 10px">${password}</span></h4>
  `;
};

export const reset_password_otp = (otp, email) => {
  return `
  <h2 style="color: green">Hello</h2>
  <p>You can reset your password by clicking the link below, or using the code</p>
  <h4> <a href=\`http://localhost:3000/reset-password/?otp=${otp}&email=${email}\`>RESET</a> </h4>
  <h4 style="font-size: 30px">CODE: <span >${otp}</span> </h4> 
  
  <h3>NB: The link and code expires in 1 hour</h3>
  `;
};
