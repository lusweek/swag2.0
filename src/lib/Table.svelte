<script>
	export let tr;
	export let td;

	/* Skicka in variabler såhär: 
        headders={[
                "tr 1",
                "tr 2",
                "tr 3"
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
				{#if tr}
					{#each tr as headder}
						<th>{headder}</th>
					{/each}
				{/if}
			</tr>
		</thead>
		<tbody>
			{#each td as row, i}
				<tr>
					{#each td[i] as td}
						{#if td.text !== undefined}
							<td class="bg-zinc-50 link">
								<a target="_blank" href={td.link}>
									{td.text}
								</a>
							</td>
						{:else}
							<td class="bg-zinc-50">{td}</td>
						{/if}
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>
