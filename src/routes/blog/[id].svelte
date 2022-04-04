<script context="module">
	export async function load({ params }) {
		const id = params.id;
		const { data: post } = await supabase.from('post').select('*').match({ id }).single();

		return {
			props: {
				post
			}
		};
	}
</script>

<script>
	import supabase from '$lib/db';
	export let post;
</script>

{#if post}
	{post.user_id}
	{post.title}
{:else}
	loading
{/if}
