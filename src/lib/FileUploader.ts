import { writable } from 'svelte/store';
import { firebaseConfig } from '$lib/firebase/firebase.client';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { notifications } from './utilis/notifications';

firebase.initializeApp(firebaseConfig);

export const fileUploader = createFileUploader();

export function createFileUploader() {
  const { subscribe, set } = writable(null);

  const uploadFile = async (file: any, folderName: string) => {
    try { 
    const storageRef = firebase.storage().ref();
    const folderRef = storageRef.child(folderName);

    const fileRef = folderRef.child(file.name);
    await fileRef.put(file);
    const snapshot = await fileRef.put(file);
    const downloadURL = await snapshot.ref.getDownloadURL();
    set({ success: true, downloadURL });
    notifications.success('Bilden har laddats upp')
    } catch (error) {
      set({ success: false, error: error.message });
      notifications.error('Något gick fel')
    }
  };

  return {
    subscribe,
    uploadFile,
  };
}