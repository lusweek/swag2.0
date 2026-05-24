// Mock of `firebase/storage` (modular). Used by evenemang page import.
export function getStorage() {
	return { __mockStorage: true };
}
export function ref(_storage, path) {
	return { _path: path || '' };
}
export async function getDownloadURL(r) {
	return r._path || '';
}
