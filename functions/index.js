const functions = require('firebase-functions/v1'); // ✅ Firestore-compatible import
const admin = require('firebase-admin');

admin.initializeApp();

exports.myFunction = functions.firestore
  .document('chat/{messageId}')
  .onCreate(async (snapshot, context) => {
    const data = snapshot.data();

    const message = {
      notification: {
        title: data.username,
        body: data.text,
      },
      data: {
        click_action: 'FLUTTER_NOTIFICATION_CLICK',
      },
      topic: 'chat',
    };

    try {
      const response = await admin.messaging().send(message);
      console.log('Successfully sent message:', response);
      return null;
    } catch (error) {
      console.error('Error sending message:', error);
      return null;
    }
  });
