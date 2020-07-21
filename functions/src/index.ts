import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
const cors = require('cors')({ origin: true })
const snedGridMail = require("@sendgrid/mail");
const sendGridAPIKey = "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"
admin.initializeApp();

exports.sendEmailVerificationLink = functions.https
.onRequest(async (request, response) => {
    return cors(request, response, async () => {
        if (request.method !== "POST") {
            response.status(400).send("Only Post Requests are supported");
            return;
        }
        console.log(request.body);
        if(request.body.email && request.body.appType) {

          let userData =await admin.auth().getUserByEmail(request.body.email);
          if(userData && userData.uid) {
            await admin.firestore()
            .collection("verificationEmails")
            .add({
              email: request.body.email,
              isVerified: false,
              appType: request.body.appType
            })
            response.send({ status: true, message: `Email verification link send successfully on ${request.body.email}.` });
          }
          else {
            response.send({ status: false, message: "This email is not found. Please use another email." });
          }
        }
        else {
          response.send({ status: false, message: "Bad request." });
        }

    });
});

exports.sendPasswordResetLink = functions.https
.onRequest(async (request, response) => {
    return cors(request, response, async () => {
        if (request.method !== "POST") {
            response.status(400).send("Only Post Requests are supported");
            return;
        }
        console.log(request.body);
        if(request.body.email && request.body.appType) {

          let userData =await admin.auth().getUserByEmail(request.body.email);
          if(userData && userData.uid) {
            await admin.firestore()
            .collection("passwordResetEmail")
            .add({
              email: request.body.email,
              isChanged: false,
              appType: request.body.appType
            })
            response.send({ status: true, message: `Password reset link send successfully on ${request.body.email} ` });
          }
          else {
            response.send({ status: false, message: "This email is not found. Please use another email." });
          }
        }
        else {
          response.send({ status: false, message: "Bad request." });
        }

    });
});


exports.createVerifyemail = functions.firestore
.document(`verificationEmails/{verifyEmailId}`)
.onCreate(async (snap, context) => {
  //create a record in user collection
  try {

    const emailDetail = snap.data();
    console.log("verifyEmailDetail", emailDetail);
    console.log("verifyEmailDetail snap.id", snap.id);

    let userData =await admin.auth().getUserByEmail(emailDetail.email);

    const text = emailDetail.appType=="customer"? 
    `<p>Hello ${userData.displayName},</p>
    <p>Follow this link to verify your email address.</p>
    <p><a href='https://app.humbl.io/auth/email/action?mode=verifyEmail&oobCode=${snap.id}</a></p>
    <p>If you didn’t ask to verify this address, you can ignore this email.</p>
    <p>Thanks,</p>
    <p>Your HUMBL Pay team</p>` 
    :
    `<p>Hello ${userData.displayName},</p>
    <p>Follow this link to verify your email address.</p>
    <p><a href='https://merchantportal.humbl.io/auth/email/action?mode=verifyEmail&oobCode=${snap.id}</a></p>
    <p>If you didn’t ask to verify this address, you can ignore this email.</p>
    <p>Thanks,</p>
    <p>Your HUMBL Merchant team</p>`

    const msg = {
      to: emailDetail.email,
      from: "mobaddicts@hotmail.com",
      subject: `Verify your email for ${emailDetail.appType=="customer"? 'HUMBL Pay': "HUMBL Merchant" }`,
      text: text,
      html: text
    };

    snedGridMail.setApiKey(sendGridAPIKey);
    snedGridMail.send(msg);

    await admin.firestore()
          .collection("verificationEmails")
          .doc(snap.id)
          .update({userId: userData.uid, sendTime: admin.firestore.FieldValue.serverTimestamp() });

} catch (error) {
  console.log("verificationEmails error", error);
}
});

exports.createPasswordResetemail = functions.firestore
.document(`passwordResetEmail/{passwordEmailId}`)
.onCreate(async (snap, context) => {
  //create a record in user collection
  try {

    const emailDetail = snap.data();
    console.log("passwordResetEmailDetail", emailDetail);
    console.log("passwordResetEmailDetail snap.id", snap.id);

    let userData =await admin.auth().getUserByEmail(emailDetail.email);

    const text = emailDetail.appType=="customer"? 
    `<p>Hello ${userData.displayName},</p>
    <p>Follow this link to verify your email address.</p>
    <p><a href='https://app.humbl.io/auth/email/action?mode=resetPassword&oobCode=${snap.id}</a></p>
    <p>If you didn’t ask to verify this address, you can ignore this email.</p>
    <p>Thanks,</p>
    <p>Your HUMBL Pay team</p>` 
    :
    `<p>Hello ${userData.displayName},</p>
    <p>Follow this link to verify your email address.</p>
    <p><a href='https://merchantportal.humbl.io/auth/email/action?mode=resetPassword&oobCode=${snap.id}</a></p>
    <p>If you didn’t ask to verify this address, you can ignore this email.</p>
    <p>Thanks,</p>
    <p>Your HUMBL Merchant team</p>`

    const msg = {
      to: emailDetail.email,
      from: "mobaddicts@hotmail.com",
      subject: `Verify your email for ${emailDetail.appType=="customer"? 'HUMBL Pay': "HUMBL Merchant" }`,
      text: text,
      html: text
    };

    snedGridMail.setApiKey(sendGridAPIKey);
    snedGridMail.send(msg);

    await admin.firestore()
          .collection("passwordResetEmail")
          .doc(snap.id)
          .update({userId: userData.uid, sendTime: admin.firestore.FieldValue.serverTimestamp() });

} catch (error) {
  console.log("verificationEmails error", error);
}
});

exports.verifyEmails = functions.https
.onRequest(async (request, response) => {
  return cors(request, response, async () => {
      if (request.method !== "POST") {
          response.status(400).send("Only Post Requests are supported");
          return;
      }
      console.log(request.body);
      if(request.body.oobCode && request.body.appType) {
        const respData = await  admin.firestore().collection('verificationEmails')
        .doc(request.body.oobCode).get();

        let verificationData : any = (respData && respData.data())? respData.data(): null;
        let isVerified = false;
        console.log("verifyEmails verificationData ", verificationData);
        if(verificationData && !verificationData.isChanged 
            && verificationData.appType === request.body.appType && verificationData.sendTime) {
              isVerified = true;
        }
        if(isVerified){
          const userData = await admin.auth().getUserByEmail(verificationData.email);
          console.log("verifyEmails userData ", userData);
          if(userData && userData.uid) {
            await admin.auth().updateUser(userData.uid,{emailVerified: true});
            response.send({ status: true, message: "Email Verified Successfully." });
          }
          else {
            response.send({ status: false, message: 'There is no user found.' });
          }
        }
        else {
          response.send({ status: false, message: 'The action code is invalid. This can happen if the code is malformed, expired, or has already been used.' });
        }
      }
      else {
          response.send({ status: false, message: "Bad request." });
      }
})
})



exports.changePassword = functions.https
.onRequest(async (request, response) => {
return cors(request, response, async () => {
    if (request.method !== "POST") {
        response.status(400).send("Only Post Requests are supported");
        return;
    }
    console.log(request.body);
    if(request.body.oobCode && request.body.appType && request.body.newPassword) {
      const respData = await  admin.firestore().collection('passwordResetEmail')
      .doc(request.body.oobCode).get();

      let verificationData : any = (respData && respData.data())? respData.data(): null;
      let isVerified = false;
      console.log("changePassword verificationData ", verificationData);
      if(verificationData && !verificationData.isChanged 
          && verificationData.appType === request.body.appType && verificationData.sendTime) {
            isVerified = true;
      }
      if(isVerified){
        const userData = await admin.auth().getUserByEmail(verificationData.email);
        console.log("changePassword userData ", userData);
        if(userData && userData.uid){
          admin.auth().updateUser(userData.uid, { password: request.body.newPassword });
          response.send({ status: true, message: "Password changed Successfully." });             
        }
        else {
          response.send({ status: false, message: 'There is no user found.' });
        }
      }
      else {
        response.send({ status: false, message: 'The action code is invalid. This can happen if the code is malformed, expired, or has already been used.' });
      }
    }
    else {
        response.send({ status: false, message: "Bad request." });
    }
})
})