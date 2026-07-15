<script lang="ts">
	export let headers : Array<String>;
	export let rows : Array<Array<any>>;

	/* Skicka in variabler såhär: 
        headers={[
                "th 1",
                "th 2",
                "th 3"
            ]} 

// Varje array är en rad
        rows={[
            ["td 1", "td 2", "td 3"],
            ["td 1", "td 2", "td 3"],
        ]}
    */
</script>

<div class="sw-table-wrap">
	<table class="sw-table">
		<thead>
			<tr>
				{#if headers}
					{#each headers as header}
						<th>{header}</th>
					{/each}
				{/if}
			</tr>
		</thead>
		<tbody>
			{#each rows as row}
				<tr>
					{#each row as column}
						<td><span>{@html column}</span></td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>