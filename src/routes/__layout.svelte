<script>
	import '../app.css';
	import { authStore, user } from '$lib/test';
	import supabase from '$lib/db';
	import { goto } from '$app/navigation';
</script>

<div class="mx-auto max-w-lg min-h-screen flex flex-col mt-20 items-center">
	<div class="flex flex-col items-center">
		{#if $user}
			<div>
				welcome {$user.email}
			</div>

			<button class="bg-blue-200 p-2" on:click={() => authStore.signOut()}>sign out</button>
		{:else}
			<label class="mt-20" for="">email</label> <br />
			<input type="email" class="border border-black" bind:value={$authStore.email} />
			<div>
				<button
					class="bg-blue-200 px-4 py-2 rounded-lg mt-2"
					on:click={() => authStore.signUp($authStore.email)}>sign up</button
				>
				<button
					class="bg-blue-200 px-4 py-2 rounded-lg mt-2"
					rel="external"
					on:click={() => authStore.signIn()}>sign in</button
				>
			</div>
		{/if}
	</div>
	<slot />
</div>
