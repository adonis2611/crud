import { writable, readable, get } from 'svelte/store';
import supabase from '$lib/db';
import { goto } from '$app/navigation';

export const user = readable(null, (set) => {
	set(supabase.auth.user());
	const unsubscribe = supabase.auth.onAuthStateChange((_, session) => {
		session ? set(session.user) : set(null);
	});
	return () => {
		unsubscribe.data.unsubscribe();
	};
});

export const authStore = (() => {
	const { subscribe, update, set } = writable({
		email: '',
		password: 'password'
	});

	return {
		subscribe,
		update,
		set,

		signIn: async (email) => {
			try {
				const { error } = await supabase.auth.signIn({
					email,
					password: 'password'
				});

				if (error) throw error;
			} catch (e) {
				console.log(e.message);
			} finally {
				goto('/post');
			}
		},
		signUp: async (email) => {
			try {
				const { error } = await supabase.auth.signUp({
					email,
					password: 'password'
				});

				if (error) throw error;
			} catch (e) {
				console.log(e.message);
			}
		},
		signOut: async () => {
			try {
				const { error } = await supabase.auth.signOut();
				goto('/');
				if (error) throw error;
			} catch (e) {
				console.log(2);
			}
		}
	};
})();
export const todoStore = (() => {
	const { subscribe, update, set } = writable({
		step: 0,
		task: '',
		allTask: [],
		isLoading: false,
		isCompleted: false
	});

	return {
		subscribe,
		update,
		set,

		get: async () => {
			try {
				const { data, error } = await supabase.from('task').select('*');

				update((state) => {
					state.allTask = data;
					return state;
				});

				if (error) throw error;
			} catch (e) {
				console.log(e.message);
			} finally {
				console.log('e.message');
			}
		},

		add: async (task, user_id) => {
			try {
				const { error } = await supabase.from('task').insert([{ task, user_id }]);

				if (error) throw error;
			} catch (e) {
				console.log(e.message);
			} finally {
				console.log('e.message');
			}
		}
	};
})();
export const postStore = (() => {
	const { subscribe, update, set } = writable({
		title: '',
		content: '',
		allPost: [],
		isLoading: false,
		isPublished: false,
		comment: ''
	});

	return {
		subscribe,
		update,
		set,

		get: async () => {
			try {
				const { data, error } = await supabase.from('post').select('*');

				update((state) => {
					state.allPost = data;
					return state;
				});

				if (error) throw error;
			} catch (e) {
				console.log(e.message);
			} finally {
				console.log('e.message');
			}
		},

		add: async (title, content, user_id) => {
			try {
				const { error } = await supabase.from('post').insert([{ title, content, user_id }]);

				if (error) throw error;
			} catch (e) {
				console.log(e.message);
			} finally {
				console.log('e.message');
				postStore.get();
			}
		},
		remove: async (id) => {
			try {
				const { error } = await supabase.from('post').delete().match({ id });

				if (error) throw error;
			} catch (e) {
				console.log(e.message);
			} finally {
				console.log('e.message');
				postStore.get();
			}
		},
		toggle: async (id, currentState) => {
			try {
				const { error } = await supabase
					.from('post')
					.update({ isPublished: !currentState })
					.match({ id });

				if (error) throw error;
			} catch (e) {
				alert(e.message);
			} finally {
				console.log('e.message');
				postStore.get();
			}
		},
		addComment: async (comment, post_id) => {
			try {
				const { error } = await supabase.from('comment').insert([{ comment, post_id }]);

				if (error) throw error;
			} catch (e) {
				console.log(e.message);
			} finally {
				console.log('done');
			}
		}
	};
})();
