<script lang="ts">
	import CmsAddTableRow from "../CMS/CmsAddTableRow.svelte";
	import CmsRemoveTableRow from "../CMS/CmsRemoveTableRow.svelte";
	import CmsUpdateTableData from "../CMS/CmsUpdateTableData.svelte";
	import { authStore } from '../../stores/authStore';

	export let tableContent: any;
	export let tableIndexToUpdate: number
	export let FBData: any
	export let getData: (() => void);

	let currentUser: object | null = null;
    authStore.subscribe((curr) => {
      currentUser = curr?.currentUser;
    });

	const headers = tableContent.headers	
	const rows = tableContent.rows

	
</script>

<div data-theme="retro" class="overflow-x-auto my-6 z-0">
	<table class="table w-full">
		<thead>
			<tr>
				{#if (headers !== undefined)}
					{#each headers as header}
						<th class="p-rel text-sm md:text-base">{header}</th>
					{/each}
					{#if (currentUser)}
						<th class="p-rel bg-red text-sm md:text-base">Ta bort rad</th>
					{/if}
				{/if}
			</tr>
		</thead>
		<tbody>
			{#if (rows !== undefined)}
			{#each rows as row, rowIndex}
				<tr>
					{#each row.columns as column, columnIndex}
						{#if column.type === 'text'}
							<td class="bg-zinc-50 text-sm md:text-base">
									{column.text}
									<CmsUpdateTableData 
										FBData={FBData}
										FBDocument={'kurser'}
										tableIndexToUpdate={tableIndexToUpdate}
										columnIndexToUpdate={columnIndex}
										rowIndexToUpdate={rowIndex}
										initialValue={column.text}
										initialHrefValue={column.href}
										getData={getData}
										type={'text'}
									/>
							</td>
						{:else if column.type === 'link'}
							<td class="bg-zinc-50 link text-sm md:text-base">
								<a target="_blank" rel="noreferrer" href={column.href}>
									{column.text}
								</a>
								<CmsUpdateTableData 
										FBData={FBData}
										FBDocument={'kurser'}
										tableIndexToUpdate={tableIndexToUpdate}
										columnIndexToUpdate={columnIndex}
										rowIndexToUpdate={rowIndex}
										initialValue={column.text}
										initialHrefValue={column.href}
										getData={getData}
										type={'link'}
									/>
							</td>				
						{/if}
					{/each}
					{#if (currentUser)}
						<td class="bg-red-50 text-xs md:text-base">
							<CmsRemoveTableRow 
							FBData={FBData}
							FBDocument={'kurser'}
							tableIndexToUpdate={tableIndexToUpdate}
							rowIndexToRemove={rowIndex}
							getData={getData}
							/>
						</td>
					{/if}
				</tr>
				{/each}
				{/if}
		</tbody>
	</table>

	<CmsAddTableRow 
		prevTableData={tableContent}
		FBData={FBData}
		FBDocument={'kurser'}
		getData={getData}
		tableIndexToUpdate={tableIndexToUpdate}
		/>
</div>

<style>
	.p-rel{
		position: relative !important;
	}
</style>