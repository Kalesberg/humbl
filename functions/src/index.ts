import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
const cors = require('cors')({ origin: true })
const snedGridMail = require("@sendgrid/mail");
const sendGridAPIKey = "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";
const sendGridFromId = "support@humbl.io";

admin.initializeApp();

exports.sendEmailVerificationLink = functions.https
.onRequest(async (request, response) => {
    return cors(request, response, async () => {
        if (request.method !== "POST") {
            response.status(400).send("Only Post Requests are supported");
            return;
        }
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
  // create a record in user collection
  try {

    const emailDetail = snap.data();
    let userData = await admin.auth().getUserByEmail(emailDetail.email);

    const text = emailDetail.appType == "customer"? 
    `<div>Hello ${userData.displayName? userData.displayName : ''},</div>
    <div>Follow this link to verify your email address.</div>
    <div><a href='https://app.humbl.io/auth/email/action?mode=verifyEmail&oobCode=${snap.id}'>
    https://app.humbl.io/auth/email/action?mode=verifyEmail&oobCode=${snap.id}</a></div>
    <div>If you didn’t ask to verify this address, you can ignore this email.</div>
    <div>Thanks,</div>
    <div>Your HUMBL Pay team</div>` 
    :
    `<div>Hello ${userData.displayName? userData.displayName : ''},</div>
    <div>Follow this link to verify your email address.</div>
    <div><a href='https://merchantportal.humbl.io/auth/email/action?mode=verifyEmail&oobCode=${snap.id}'>
    https://merchantportal.humbl.io/auth/email/action?mode=verifyEmail&oobCode=${snap.id}</a></div>
    <div>If you didn’t ask to verify this address, you can ignore this email.</div>
    <div>Thanks,</div>
    <div>Your HUMBL Merchant team</div>`

    const msg = {
      to: emailDetail.email,
      from: sendGridFromId,
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
    console.error("verificationEmails error", error);
  }
});

exports.createPasswordResetemail = functions.firestore
.document(`passwordResetEmail/{passwordEmailId}`)
.onCreate(async (snap, context) => {
  //create a record in user collection
  try {

    const emailDetail = snap.data();
    let userData = await admin.auth().getUserByEmail(emailDetail.email);

    const text = emailDetail.appType=="customer"? 
    `<html><body><div>Hello ${userData.displayName? userData.displayName : ''},</div>
    <div>Follow this link to verify your email address.</div>
    <div><a href='https://app.humbl.io/auth/email/action?mode=resetPassword&oobCode=${snap.id}'>
    https://app.humbl.io/auth/email/action?mode=resetPassword&oobCode=${snap.id}</a></div>
    <div>If you didn’t ask to verify this address, you can ignore this email.</div>
    <div>Thanks,</div>
    <div>Your HUMBL Pay team</div></body></html>` 
    :
    `<html><body><div>Hello ${userData.displayName? userData.displayName : ''},</div>
    <div>Follow this link to verify your email address.</div>
    <div><a href='https://merchantportal.humbl.io/auth/email/action?mode=resetPassword&oobCode=${snap.id}'>
    https://merchantportal.humbl.io/auth/email/action?mode=resetPassword&oobCode=${snap.id}</a></div>
    <div>If you didn’t ask to verify this address, you can ignore this email.</div>
    <div>Thanks,</div>
    <div>Your HUMBL Merchant team</div></body></html>`

    const msg = {
      to: emailDetail.email,
      from: sendGridFromId,
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
    console.error("verificationEmails error", error);
  }
});

exports.verifyEmails = functions.https
.onRequest(async (request, response) => {
  return cors(request, response, async () => {
      if (request.method !== "POST") {
          response.status(400).send("Only Post Requests are supported");
          return;
      }
      if(request.body.oobCode && request.body.appType) {
        const respData = await  admin.firestore().collection('verificationEmails')
        .doc(request.body.oobCode).get();
        let verificationData : any = (respData && respData.data())? respData.data(): null;
        let isVerified = false;
        if(verificationData && !verificationData.isVerified 
            && verificationData.appType === request.body.appType && verificationData.sendTime) {
          if(Date.now() - new Date(verificationData.sendTime._seconds*1000).getTime()  < (30*60*1000)){
              isVerified = true;
            }
        }
        if(isVerified){
          const userData = await admin.auth().getUserByEmail(verificationData.email);
          if(userData && userData.uid) {
            await admin.auth().updateUser(userData.uid,{emailVerified: true});
            await admin.firestore().collection('verificationEmails')
              .doc(request.body.oobCode).update({isVerified: true})
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
    if(request.body.oobCode && request.body.appType && request.body.newPassword) {
      const respData = await  admin.firestore().collection('passwordResetEmail')
      .doc(request.body.oobCode).get();
      let verificationData : any = (respData && respData.data())? respData.data(): null;
      let isVerified = false;
      if(verificationData && !verificationData.isChanged 
          && verificationData.appType === request.body.appType && verificationData.sendTime) {
          if(Date.now() - new Date(verificationData.sendTime._seconds*1000).getTime()  < (30*60*1000)){
            isVerified = true;
          }
      }
      if(isVerified){
        const userData = await admin.auth().getUserByEmail(verificationData.email);
        if(userData && userData.uid){
          await admin.auth().updateUser(userData.uid, { password: request.body.newPassword });
          await admin.firestore().collection('passwordResetEmail')
          .doc(request.body.oobCode).update({isChanged: true})
          response.send({ status: true, message: "Password changed Successfully." });             
        }
        else {
          response.send({ status: false, message: 'There is no user found.' });
        }
      }
      else {
        response.send({ status: false, message: 'The link is invalid. This can happen if the link is malformed, expired, or has already been used.' });
      }
    }
    else {
        response.send({ status: false, message: "Bad request." });
    }
  })
})