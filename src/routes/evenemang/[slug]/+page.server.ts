import { error } from '@sveltejs/kit';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '$lib/firebase/firebase.client';

/** @type {import('./$types').PageServerLoad} */
const evenemangRef = collection(db, 'evenemang');
let evenemang: Array<object> = [];

const getEvenemang = async () => {
    const data = await getDocs(evenemangRef);
    evenemang = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export async function load({ params }) {
    
    await getEvenemang();

    const event = evenemang.find((event) => event.id === params.slug)

    if (!event) throw error(404);
// Skickad evenemangs i objektet 'data' till +page.svelte
    return {
        event: event
    }
}