import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

export const setAuthorClaims = functions.https.onRequest(
  (request, response) => {
    async function grantAuthorRole(email: string) {
      const user = await admin.auth().getUserByEmail(email);
      if (user.customClaims && (user.customClaims as any).author === true) {
        return;
      } else {
        return admin.auth().setCustomUserClaims(user.uid, {
          author: true
        });
      }
    }
  }
);
