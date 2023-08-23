<script lang="ts">
	import CmsAddTableColumn from "./CMS/CmsAddTableColumn.svelte";

	export let tableContent: any;
	export let tableIndexToUpdate: number
	export let FBData: any
	export let getData: (() => void);

	const headers = tableContent.headers	
	const rows = tableContent.rows

		console.log('tableContent', tableContent)

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

	<CmsAddTableColumn 
		prevTableData={tableContent}
		FBData={FBData}
		FBDocument={'test'}
		FBField={'open_gym'}
		FBObjectKey={'tables_test'}
		getData={getData}
		tableIndexToUpdate={tableIndexToUpdate}
		/>
</div>

<style>
	.p-rel{
		position: relative !important;
	}
</style>