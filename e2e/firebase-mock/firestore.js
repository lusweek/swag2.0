// Mock of `firebase/firestore` (modular). Routes by path to fixtures.
import { kurserData, evenemangDocs, membersDocs } from './fixtures.js';

const DOCS = {
	'CMS/kurser': kurserData
};
const COLLECTIONS = {
	evenemang: evenemangDocs,
	members: membersDocs
};

export function getFirestore() {
	return { __mockDb: true };
}

export function doc(_db, ...segments) {
	// doc(db, 'CMS', 'kurser') or doc(db, collectionRef, id)
	const parts = segments.flatMap((s) =>
		s && typeof s === 'object' && s._path ? s._path : s
	);
	return { _path: parts.join('/') };
}

export function collection(_db, name) {
	return { _path: name };
}

export async function getDoc(ref) {
	const data = DOCS[ref._path];
	return {
		exists: () => data !== undefined,
		data: () => data,
		id: ref._path.split('/').pop()
	};
}

export async function getDocs(ref) {
	const list = COLLECTIONS[ref._path] || [];
	return {
		docs: list.map((d) => ({ id: d.id, data: () => d })),
		size: list.length,
		empty: list.length === 0
	};
}

export async function addDoc() {
	return { id: 'mock-' + Math.random().toString(36).slice(2, 9) };
}

export async function updateDoc() {}
export async function deleteDoc() {}
export async function setDoc() {}
export function serverTimestamp() {
	return new Date();
}
