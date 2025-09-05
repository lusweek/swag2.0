<script lang="ts">
	import CmsAddTableRow from '../CMS/CmsAddTableRow.svelte';
	import CmsRemoveTableRow from '../CMS/CmsRemoveTableRow.svelte';
	import CmsUpdateTableData from '../CMS/CmsUpdateTableData.svelte';
	import { authStore } from '../../stores/authStore';

	export let tableContent: any;
	export let tableIndexToUpdate: number;
	export let FBData: any;
	export let getData: () => void;

	let currentUser: object | null = null;
	authStore.subscribe((curr) => {
		currentUser = curr?.currentUser;
	});

	const headers = tableContent.headers;
	const rows = tableContent.rows;

	// Byter rad efter X antal ord

	function insertLineBreaks(text, wordsPerLine = 3) {
		return text
			.split(' ')
			.map((word, i) => (i > 0 && i % wordsPerLine === 0 ? '<br>' + word : word))
			.join(' ');
	}

</script>

<div data-theme="retro" class="overflow-x-auto my-2 z-0">
	<table class="table w-full sm:w-[95vw] table-fixed">
	<thead>
		<tr>
			{#if headers !== undefined}
				{#each headers as header, headerIndex}
					<th
						class={`p-rel text-sm md:text-base ${headerIndex === 0 ? 'w-[37%]' : headerIndex === 1 ? 'w-[73%]' : ''}`}
					>
						{header}
					</th>
				{/each}
				{#if currentUser}
					<th class="p-rel bg-red text-sm md:text-base">Ta bort rad</th>
				{/if}
			{/if}
		</tr>
	</thead>
	<tbody>
		{#if rows !== undefined}
			{#each rows as row, rowIndex}
				<tr>
					{#each row.columns as column, columnIndex}
						{#if column.type === 'text'}
							<td
								class={`bg-zinc-50 text-sm md:text-base ${columnIndex === 0 ? 'w-[37%]' : columnIndex === 1 ? 'w-[73%]' : ''}`}
							>
								{@html insertLineBreaks(column.text, columnIndex == 0 ? 2 : 3)}
								<CmsUpdateTableData
									{FBData}
									FBDocument={'kurser'}
									{tableIndexToUpdate}
									columnIndexToUpdate={columnIndex}
									rowIndexToUpdate={rowIndex}
									initialValue={column.text}
									initialHrefValue={column.href}
									{getData}
									type={'text'}
								/>
							</td>
						{:else if column.type === 'link'}
							<td
								class={`bg-zinc-50 link text-sm md:text-base ${columnIndex === 0 ? 'w-[37%]' : columnIndex === 1 ? 'w-[73%]' : ''}`}
							>
								<a target="_blank" rel="noreferrer" href={column.href}>
									{@html insertLineBreaks(column.text, columnIndex == 0 ? 2 : 3)}
								</a>
								<CmsUpdateTableData
									{FBData}
									FBDocument={'kurser'}
									{tableIndexToUpdate}
									columnIndexToUpdate={columnIndex}
									rowIndexToUpdate={rowIndex}
									initialValue={column.text}
									initialHrefValue={column.href}
									{getData}
									type={'link'}
								/>
							</td>
						{/if}
					{/each}
					{#if currentUser}
						<td class="bg-red-50 text-xs md:text-base">
							<CmsRemoveTableRow
								{FBData}
								FBDocument={'kurser'}
								{tableIndexToUpdate}
								rowIndexToRemove={rowIndex}
								{getData}
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
		{FBData}
		FBDocument={'kurser'}
		{getData}
		{tableIndexToUpdate}
	/>
</div>

<style>
	.p-rel {
		position: relative !important;
	}
</style>
