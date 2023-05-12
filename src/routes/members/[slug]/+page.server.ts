import { error } from '@sveltejs/kit';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '$lib/firebase/firebase.client';

const membersRef = collection(db, 'members');
let members: Array<object> = [];

const getMembers = async () => {
    const data = await getDocs(membersRef);
    members = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};


export async function load({ params }) {

    await getMembers();

    const member = members.find((member) => member.id === params.slug)

    if (!member) throw error(404);
// Skickad members i objektet data till +page.svelte
    return {
        member: member
    }
}