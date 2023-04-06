<script lang="ts">
	import '../../app.css';
	import { authHandlers, authStore } from '../../stores/authStore';
	import { getDocs, addDoc, collection } from 'firebase/firestore';
	import { db } from '$lib/firebase/firebase.client';
	import Table from '$lib/Table.svelte';

	const membersRef = collection(db, 'members');

	// Gets data from firestore
	let members: Array<object> = [];

	const getMembers = async () => {
		const data = await getDocs(membersRef);
		members = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
	};
	getMembers();

	const headders = [
		'Namn',
		'Email',
		'Telefonnummer',
		'Födelsedatum',
		'adress',
		'postnummer',
		'Meddelande'
	];
</script>

{#if $authStore?.currentUser}
	<h1 class="text-center">Välkommen Jakob!</h1>

	{#if members}
		<h2 class="text-center">Här kan du se alla medlemmar</h2>

		<div data-theme="retro" class="overflow-x-auto m-6 z-0">
			<table class="table w-full">
				<thead>
					<tr>
						{#each headders as headder}
							<th class="p-rel text-sm md:text-base">{headder}</th>
						{/each}
					</tr>
				</thead>
				<tbody>
					{#each members as member}
						<tr>
							<td class="bg-zinc-50 text-xs md:text-base"
								><span>{member.fName} {member.lName}</span></td
							>
							<td class="bg-zinc-50 text-xs md:text-base"><span>{member.email}</span></td>
							<td class="bg-zinc-50 text-xs md:text-base"
								><span>{member.phoneNr ? member.phoneNr : '-'}</span></td
							>
							<td class="bg-zinc-50 text-xs md:text-base"><span>{member.birth}</span></td>
							<td class="bg-zinc-50 text-xs md:text-base"><span>{member.adress}</span></td>
							<td class="bg-zinc-50 text-xs md:text-base"><span>{member.postNr}</span></td>
							<td class="bg-zinc-50 text-xs md:text-base"
								><span>{member.message ? member.message : '-'}</span></td
							>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{:else}
		<div>Laddar...</div>
	{/if}
{:else}
	<div>Laddar...</div>
{/if}

<style>
	.p-rel {
		position: relative !important;
	}
</style>
