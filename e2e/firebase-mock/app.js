// Mock of `@firebase/app` used by firebase.client.js
export function initializeApp() {
	return { __mockApp: true };
}
export function getApps() {
	return [];
}
export function getApp() {
	return { __mockApp: true };
}
export function deleteApp() {}
