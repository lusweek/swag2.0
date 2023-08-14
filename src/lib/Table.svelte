<script lang="ts">
	import Cms from "$lib/CMS/Cms.svelte";

	export let tableContent;

	const headers = tableContent.headers	
	const rows = tableContent.rows

		console.log('rows', rows)

		let tables = [
		{
			headers: ['plats', 'tid'],
			rows: [
				{
				columns: [	{type: 'link', href: 'endpoint', text: "Slottskogen, Plikta - GRATIS"}, 
							{type: "text", text: "Onsdagar, 18:00 - 21:00"}
						]
				},
			]
		},

	]


</script>

<div data-theme="retro" class="overflow-x-auto my-6 z-0">
	<table class="table w-full">
		<thead>
			<tr>
				{#if headers}
					{#each headers as header}
						<th class="p-rel text-sm md:text-base">{header}</th>
					{/each}
				{/if}
			</tr>
		</thead>
		<tbody>
			{#each rows as row}
				<tr>
					{#each row.columns as column}
						{#if column.type === 'text'}
							<td class="bg-zinc-50 text-xs md:text-base">
								{column.text}
							</td>
						{:else if column.type === 'link'}
							<td class="bg-zinc-50 link text-xs md:text-base">
								<a target="_blank" href={column.link}>
									{column.text}
								</a>
							</td>				
						{/if}
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.p-rel{
		position: relative !important;
	}
</style>
							<!-- <Cms 
								type={'array'} 
								value={row.text}
								prevObjectField={row}
								prevArray={row}
								rows={2}
								FBDocument={'kurser'}
								FBField={'open_gym'}
								FBObjectKey={'texts'}
								index={index}
								getData={getFBData}
							/> -->