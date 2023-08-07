import { firebaseConfig } from '$lib/firebase/firebase.client';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

firebase.initializeApp(firebaseConfig);

// Hämtar bilder från Firebase och retunerar en Array
export async function getImagesFromFolder(folderName) {
    const storageRef = firebase.storage().ref();
    const folderRef = storageRef.child(folderName);
  
    const imageUrls = [];
  
    try {
      const listResult = await folderRef.listAll();
      for (const item of listResult.items) {
        const downloadURL = await item.getDownloadURL();
        console.log('item bild: ', item)
        imageUrls.push(downloadURL);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    }

    console.log('imageUrls', imageUrls)
  
    return imageUrls;
  }