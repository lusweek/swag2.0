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

	const headers = tableContent.headers
	const rows = tableContent.rows;

	// Byter rad efter X antal ord

	function insertLineBreaks(text, wordsPerLine = 3) {
		return text
			.split(' ')
			.map((word, i) => (i > 0 && i % wordsPerLine === 0 ? '<br>' + word : word))
			.join(' ');
	}

</script>

<div class="sw-table-wrap">
	<table class="sw-table table-fixed">
	<thead>
		<tr>
			{#if headers !== undefined}
				{#each headers as header, headerIndex}
					<th
						class={`${headerIndex === 0 ? 'w-[37%]' : headerIndex === 1 ? 'w-[73%]' : ''}`}
					>
						{header}
					</th>
				{/each}
				{#if currentUser}
					<th>Ta bort rad</th>
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
								class={`${columnIndex === 0 ? 'w-[37%]' : columnIndex === 1 ? 'w-[73%]' : ''}`}
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
								class={`${columnIndex === 0 ? 'w-[37%]' : columnIndex === 1 ? 'w-[73%]' : ''}`}
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
						<td>
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
