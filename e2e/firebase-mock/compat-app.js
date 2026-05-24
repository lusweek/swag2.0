// Mock of `firebase/compat/app` default export, used by imageFetcher.js:
//   firebase.initializeApp(cfg); firebase.storage().ref().child(folder).listAll()
import { storageFolders } from './fixtures.js';

const firebase = {
	initializeApp() {},
	storage() {
		return {
			ref() {
				return {
					child(folderName) {
						const urls = storageFolders[folderName] || [];
						return {
							async listAll() {
								return {
									items: urls.map((url) => ({
										async getDownloadURL() {
											return url;
										}
									}))
								};
							}
						};
					}
				};
			}
		};
	}
};

export default firebase;
