<script lang="ts">
	import CmsAddTableRow from "./CMS/CmsAddTableRow.svelte";
	import CmsRemoveTableRow from "./CMS/CmsRemoveTableRow.svelte";
	import CmsUpdateTableData from "./CMS/CmsUpdateTableData.svelte";
	import { authStore } from '../stores/authStore';

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
				{#if headers}
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
			{#each rows as row, rowIndex}
				<tr>
					{#each row.columns as column, columnIndex}
						{#if column.type === 'text'}
							<td class="bg-zinc-50 text-xs md:text-base">
									{column.text}
									<CmsUpdateTableData 
										FBData={FBData}
										FBDocument={'test'}
										tableIndexToUpdate={tableIndexToUpdate}
										columnIndexToUpdate={columnIndex}
										rowIndexToUpdate={rowIndex}
										initialValue={column.text}
										getData={getData}
									/>
							</td>
						{:else if column.type === 'link'}
							<td class="bg-zinc-50 link text-xs md:text-base">
								<a target="_blank" href={column.link}>
									{column.text}
								</a>
							</td>				
						{/if}
					{/each}
					{#if (currentUser)}
						<td class="bg-red-50 text-xs md:text-base">
							<CmsRemoveTableRow 
							FBData={FBData}
							FBDocument={'test'}
							tableIndexToUpdate={tableIndexToUpdate}
							rowIndexToRemove={rowIndex}
							getData={getData}
							/>
						</td>
					{/if}
				</tr>
			{/each}
		</tbody>
	</table>

	<CmsAddTableRow 
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