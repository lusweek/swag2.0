<script lang="ts">
	import '../../app.css';
	import { authStore } from '../../stores/authStore';
	import { getDocs, doc, addDoc, deleteDoc, collection } from 'firebase/firestore';
	import { db } from '$lib/firebase/firebase.client';
	import Loader from '$lib/Loader.svelte';
	import FaEdit from 'svelte-icons/fa/FaEdit.svelte'
	import { notifications } from '$lib/utilis/notifications';
	
	const headders = [
		'Namn',
		'Email',
		'Födelsedatum',
		'adress',
		'postnummer',
		'Telefonnummer',
		'Meddelande',
		'',
		''
	];

	let isLoading = false

	// Hämtar data från Firestore

	const membersRef = collection(db, 'members');
	let members: Array<object> = [];

	const getMembers = async () => {
		isLoading = true
		const data = await getDocs(membersRef);
		members = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
		isLoading = false
	};
	getMembers();

	// remove data
	const deleteMember = async (member) => {
		if (confirm(`Vill du radera '${member.fName} ${member.lName}' från medlemslistan?`)) {
			isLoading = true
			await deleteDoc(doc(db, "members", member.id));
			getMembers();
			isLoading = false
			notifications.success(`${member.fName} har tagits bort`)
		}
	}

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
							<td class="bg-zinc-50 text-xs md:text-base {!member.fName && !member.lName && 'italic text-red-500'}"><span>{member.fName && member.lName ? `${member.fName} ${member.lName}` : 'ej angivet' }</span></td>
							<td class="bg-zinc-50 text-xs md:text-base {!member.email && 'italic text-red-500'}"><span>{member.email ? member.email : 'ej angivet' }</span></td>
							<td class="bg-zinc-50 text-xs md:text-base {!member.birth && 'italic text-red-500'}"><span>{member.birth ? member.birth : 'ej angivet'} </span></td>
							<td class="bg-zinc-50 text-xs md:text-base {!member.adress && 'italic text-red-500'}"><span>{member.adress ? member.adress : 'ej angivet'} </span></td>
							<td class="bg-zinc-50 text-xs md:text-base {!member.postNr && 'italic text-red-500'}"><span>{member.postNr ? member.postNr : 'ej angivet'} </span></td>
							<td class="bg-zinc-50 text-xs md:text-base"><span>{member.phoneNr ? member.phoneNr : '-'}</span></td>
							<td class="bg-zinc-50 text-xs md:text-base"><span>{member.message ? member.message : '-'}</span></td>
							<td class="bg-zinc-50 text-xs md:text-base">
								<button class="btn btn-square min-h-fit	h-8 w-8 bg-red-600" on:click={() => deleteMember(member)}>
									<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
								  </button>
							</td>
							<td class="bg-zinc-50 text-xs md:text-base">
								<a href={`/members/${member.id}`}>
									<button class="btn btn-square min-h-fit	h-8 w-8">
										<div class="h-6 w-5 flex justify-center items-center text-white	"><FaEdit /></div>
									</button>
								</a>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
		{/if}
	{/if}

	<Loader isLoading={isLoading} />
	

<style>
	.p-rel {
		position: relative !important;
	}
</style>
