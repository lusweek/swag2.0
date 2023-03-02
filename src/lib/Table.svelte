<script lang="ts">
	export let headers : Array<String>;
	export let data : Array<Array<any>>;

	/* Skicka in variabler såhär: 
        headers={[
                "th 1",
                "th 2",
                "th 3"
            ]} 

// Varje array är en rad
        rows={[
            [{text: "td 1", link}, "td 2", "td 3"], <--- med länk
            ["td 1", "td 2", "td 3"], <--- utan länk
        ]}
    */
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
			{#each data as row}
				<tr>
					{#each row as column}
						{#if column.text !== undefined}
							<td class="bg-zinc-50 link text-xs md:text-base">
								<a target="_blank" href={column.link}>
									{column.text}
								</a>
							</td>
						{:else}
							<td class="bg-zinc-50 text-xs md:text-base"><span>{column}</span></td>
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