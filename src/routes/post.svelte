<script>
	import { postStore, user } from '$lib/test';
</script>

<div class="mt-20">
	<form
		on:submit|preventDefault={() => postStore.add($postStore.title, $postStore.content, $user.id)}
	>
		<label for="">Post Title</label> <br />
		<input bind:value={$postStore.title} type="text" class="border border-black" /> <br />
		<label for="">Content</label> <br />
		<input bind:value={$postStore.content} type="text" class="border border-black" /> <br />
		<button type="submit" class="bg-blue-200 w-full py-1 mt-4 rounded-md"> Submit </button>
	</form>
</div>

<div class="mt-20">
	{#await postStore.get()}
		loading
	{:then}
		{#if $postStore.allPost.length}
			{#each $postStore.allPost as item}
				<a href={`/blog/${item.id}`}>
					<div class="mt-2 p-2 rounded-md border hover:bg-gray-50">
						{item.isPublished}
						isPublished:
						<input
							on:click={() => postStore.toggle(item.id, item.isPublished)}
							bind:checked={item.isPublished}
							type="checkbox"
							name=""
							id=""
						/>
						<div>
							title: {item.title}
						</div>
						<div>
							content: {item.content}
						</div>
					</div>
				</a>
				<button class="bg-blue-200 px-2 rounded" on:click={() => postStore.remove(item.id)}
					>Remove</button
				>
			{/each}
		{:else}
			no new post
		{/if}
	{/await}
</div>
