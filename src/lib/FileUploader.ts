import { writable } from 'svelte/store';
import { firebaseConfig } from '$lib/firebase/firebase.client';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { notifications } from './utilis/notifications';

firebase.initializeApp(firebaseConfig);

export const fileUploader = createFileUploader();

export function createFileUploader() {
  const { subscribe, set } = writable({ success: false, error: '', downloadURL: '' });

  const uploadFile = async (file, folderName) => {
    try {
      const storageRef = firebase.storage().ref();
      const folderRef = storageRef.child(folderName);

      const fileName = file.title; // Use provided ID and original filename
      const fileRef = folderRef.child(fileName);
      const snapshot = await fileRef.put(file);
      const downloadURL = await snapshot.ref.getDownloadURL();
      set({ success: true, downloadURL, error: '' });
    } catch (error) {
      set({ success: false, downloadURL: '', error: error.message });
      notifications.error('Något gick fel');
      console.log(error);
    }
  };

  return {
    subscribe,
    uploadFile,
  };
}
