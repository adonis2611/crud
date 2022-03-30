<script>
	import { goto } from '$app/navigation';

	import supabase from '$lib/db';

	import { authStore } from '$lib/test';

	// const signUp = async () => {
	// 	let { user, error } = await supabase.auth.signUp({
	// 		email: email,
	// 		password: 'asdweqweqwe'
	// 	});
	// 	goto('/pricing');
	// };
	// const login = async () => {
	// 	let { user, error } = await supabase.auth.signIn({
	// 		email: 'random@gmail.com',
	// 		password: 'asdweqweqwe'
	// 	});
	// };
</script>

<label for="">email</label>
<input type="email" class="bg-transparent" bind:value={$authStore.email} />
{$authStore.email}

<button on:click={() => authStore.signUp($authStore.email)}>sign up</button>
