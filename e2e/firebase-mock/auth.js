// Mock of `firebase/auth` (modular) used by firebase.client.js + stores/authStore.js
export function getAuth() {
	return {
		__mockAuth: true,
		currentUser: null,
		onAuthStateChanged(cb) {
			Promise.resolve().then(() => cb(null));
			return () => {};
		}
	};
}
export function setPersistence() {
	return Promise.resolve();
}
export const inMemoryPersistence = { type: 'NONE' };

export async function signInWithEmailAndPassword() {
	throw new Error('mock-auth: sign in disabled in E2E');
}
export async function createUserWithEmailAndPassword() {
	return { user: null };
}
export async function sendPasswordResetEmail() {}
export async function updateEmail() {}
export async function updatePassword() {}
export async function signOut() {}
export function onAuthStateChanged(_auth, cb) {
	Promise.resolve().then(() => cb(null));
	return () => {};
}
