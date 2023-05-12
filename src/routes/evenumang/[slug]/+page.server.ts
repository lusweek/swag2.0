import { error } from '@sveltejs/kit';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '$lib/firebase/firebase.client';

const evenumangRef = collection(db, 'evenumang');
let evenumang: Array<object> = [];

const getEvenumang = async () => {
    const data = await getDocs(evenumangRef);
    evenumang = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export async function load({ params }) {
    
    await getEvenumang();

    const event = evenumang.find((event) => event.id === params.slug)

    if (!event) throw error(404);
// Skickad evenumangs i objektet data till +page.svelte
    return {
        event: event
    }
}