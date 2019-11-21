const functions = require('firebase-functions');
const admin = require('firebase-admin');
const uuid = require('uuid').v4;
const {
  NUMBER_OF_GROUPS,
  GROUP_TYPES,
} = require('../constants');

/**
 * Creates the default group object with the number of gourps constants.
 */
const createGroupItems = () => [...Array(NUMBER_OF_GROUPS).keys()].reduce((o, index) => ({
  ...o,
  [uuid()]: index === 0 ? 'Default' : '',
}), {});

/**
 * Deletes every data that relates to the actual user.
 *
 * 1. Deletes the profile photo if present from storage.
 * 2. Deletes the profile document from firestore.
 */
const userCleanup = functions.auth.user().onDelete(async user => {
  const bucket = admin.storage().bucket();
  const { uid } = user;

  console.log('[userCleanup]: User ID: ', uid);

  try {
    const profileDoc = admin.firestore().collection('profiles').doc(uid);
    const queryDocumentSnapshot = await profileDoc.get();
    const photoName = queryDocumentSnapshot.get('photoName');

    if (photoName) {
      console.log('[userCleanup]: Cleanup profile photo...');
      const userProfilePhotoPath = `profiles/${uid}/${photoName}`;
      await bucket.file(userProfilePhotoPath).delete();
    }

    console.log('[userCleanup]: Cleanup profile data...');
    await profileDoc.delete();

    console.log('[userCleanup]: Cleanup collections data...');
    const collectionDoc = admin.firestore().collection('collections').doc(uid);
    await collectionDoc.delete();

  } catch (error) {
    console.error('[userCleanup]: Failed with error: ', error);
  }
});

/**
 * Creates the new fixed length tv and movi groups for the new user.
 */
const userCreate = functions.auth.user().onCreate(async user => {
  const { uid } = user;

  console.log('[userCreate]: User ID: ', uid);

  try {
    console.log('[userCreate]: Create the default tv groups for the new user...');
    await admin.firestore()
      .collection('collections')
      .doc(uid)
      .collection('groups')
      .doc(GROUP_TYPES.TV)
      .set(createGroupItems());

    console.log('[userCreate]: Create the default movie groups for the new user...');
    await admin.firestore()
      .collection('collections')
      .doc(uid)
      .collection('groups')
      .doc(GROUP_TYPES.MOVIE)
      .set(createGroupItems());

  } catch (error) {
    console.error('[userCreate]: Failed with error: ', error);
  }
});


module.exports = {
  userCleanup,
  userCreate,
};
