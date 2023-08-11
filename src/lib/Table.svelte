<script lang="ts">
	import Cms from "$lib/CMS/Cms.svelte";

	export let headers : Array<String>;
	export let data : Array<Array<any>>;

		console.log('table data', data)

	/* Skicka in variabler såhär: 
        headers={[
                "th 1",
                "th 2",
                "th 3"
            ]} 

// Varje array är en rad
        data={[
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
			{console.log('row', row)}
				<tr>
					{#each row as column, index}
						{#if column.text !== undefined}
							<td class="bg-zinc-50 link text-xs md:text-base">
								<a target="_blank" href={column.link}>
									{column.text}
								</a>
							</td>

							<!-- <Cms 
								type={'array'} 
								value={column.text}
								prevObjectField={row}
								prevArray={column}
								rows={2}
								FBDocument={'kurser'}
								FBField={'open_gym'}
								FBObjectKey={'texts'}
								index={index}
								getData={getFBData}
							/> -->

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