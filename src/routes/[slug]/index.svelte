<script context="module">
	export async function load({ params }) {
		const id = params.slug;
		const { data: post } = await supabase
			.from('post')
			.select('title,content,id, comment(comment)')
			.match({ id })
			.single();

		return {
			props: {
				post
			}
		};
	}
</script>

<script>
	import supabase from '$lib/db';
	import { postStore } from '$lib/test';
	export let post;
</script>

{#if post}
	this is your post title:{post.title} <br />
	this is your post content: {post.content} <br />
	comments: {#each post.comment as item}
		{item.comment} <br />
	{/each}
	<div class="mt-10">
		<input class="border" type="text" bind:value={$postStore.comment} />
		<button on:click={() => postStore.addComment($postStore.comment, post.id)}>add comment</button>
	</div>
{:else}
	loading
{/if}
