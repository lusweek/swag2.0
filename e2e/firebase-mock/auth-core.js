// Mock of `@firebase/auth` used by firebase.client.js (getAuth + persistence).
// The returned auth object exposes onAuthStateChanged (called in +layout.svelte).
export function getAuth() {
	return {
		__mockAuth: true,
		currentUser: null,
		onAuthStateChanged(cb) {
			// Start signed-out; emit asynchronously like the real SDK.
			Promise.resolve().then(() => cb(null));
			return () => {};
		}
	};
}
export function setPersistence() {
	return Promise.resolve();
}
export const inMemoryPersistence = { type: 'NONE' };
