import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const addAuthor = functions
  .region('europe-west1')
  .https.onCall((data, context) => {
    return grantAuthorRole(data.email)
      .then(() => {
        console.log('IN THE CALLBACK OF GRANT AUTHOR ROLE');
        return { result: 'Added author claims to ' + data.email };
      })
      .catch(error => {
        console.log(error);
        return { error };
      });
    // if (context.auth) {
    //   if (context.auth.token.owner !== true) {
    //     return { error: 'Request not authorized. User must be owner.' };
    //   } else {
    //     const email = data.email;
    //     return grantAuthorRole(email).then(() => {
    //       return { result: 'Added author claims to ' + email };
    //     });
    //   }
    // } else {
    //   return { error: 401 };
    // }
  });

async function grantAuthorRole(email: string): Promise<void> {
  const user = await admin.auth().getUserByEmail(email);
  console.log(user);
  return admin.auth().setCustomUserClaims(user.uid, {
    owner: true
  });
}
