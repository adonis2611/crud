<script>
	import { goto } from '$app/navigation';

	import { todoStore, user } from '$lib/test';
	const test = () => {
		goto('/task/2');
	};
</script>

<div class="mt-20">
	Welcome
	{#if $user}
		{$user.email} <br />
	{/if}
</div>

{#if $user}
	<form on:submit|preventDefault={() => todoStore.add($todoStore.task, $user.id)}>
		<button class="bg-blue-400">Submit</button>
		<input type="text" class="border border-black " bind:value={$todoStore.task} />
	</form>
	{#await todoStore.get()}
		loading
	{:then res}
		{#if $todoStore.allTask.length}
			<div class="flex-col flex">
				{#each $todoStore.allTask as item}
					<div>
						<a href={`/task/${item.id}`}>
							{item.task}
						</a>
					</div>
				{/each}
			</div>
		{:else}
			no available task
		{/if}
	{/await}
{/if}
