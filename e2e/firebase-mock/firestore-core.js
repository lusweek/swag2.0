// Mock of `@firebase/firestore` used by firebase.client.js (getFirestore only).
export function getFirestore() {
	return { __mockDb: true };
}
