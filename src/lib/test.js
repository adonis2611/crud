import { writable } from 'svelte/store';
import supabase from '$lib/db';
import { AuthUser } from '@supabase/supabase-js';

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

		get: async (allTask) => {
			update((state) => {
				state.isLoading = true;
				return state;
			});
			try {
				let { data, error } = await supabase.from('todos').select('*');

				update((state) => {
					state.allTask = data;
					return state;
				});

				// update((state) => (state = { ...state, allTask: data })); //this is another way of writing it
				if (error) throw error;
			} catch (e) {
				console.log(e.message);
			} finally {
				update((state) => (state = { ...state, isLoading: false }));
			}
		},
		add: async (task, isCompleted) => {
			update((state) => (state = { ...state, step: 2, isLoading: true }));
			try {
				const { error } = await supabase.from('todos').insert([{ task, isCompleted }]);
				todoStore.get();
				update((state) => (state = { ...state, task: '' }));
				if (error) throw error;
			} catch (e) {
				alert(e.message);
			} finally {
				update((state) => (state = { ...state, isLoading: false }));
			}
		},
		delete: async (id) => {
			update((state) => (state = { ...state, step: 2, isLoading: true }));
			try {
				const { error } = await supabase.from('todos').delete().match({ id });
				todoStore.get();

				if (error) throw error;
			} catch (e) {
				alert(e.message);
			} finally {
				update((state) => (state = { ...state, isLoading: false }));
			}
		},
		toggle: async (id, currentState) => {
			update((state) => (state = { ...state, step: 2, isLoading: true }));
			try {
				const { error } = await supabase
					.from('todos')
					.update({ isCompleted: !currentState })
					.match({ id });
				todoStore.get();

				if (error) throw error;
			} catch (e) {
				alert(e.message);
			} finally {
				update((state) => (state = { ...state, isLoading: false }));
			}
		}
	};
})();

export const authStore = (() => {
	const { subscribe, update, set } = writable({
		email: '',
		isLoading: false
	});

	return {
		subscribe,
		update,
		set,

		signUp: async (email) => {
			update((state) => (state = { ...state, isLoading: true }));
			try {
				let { error } = await supabase.auth.signUp({
					email,
					password: 'password'
				});
				update((state) => {
					state.email = '';
					return state;
				});

				if (error) throw error;
			} catch (e) {
				alert(e.message);
			} finally {
				update((state) => (state = { ...state, isLoading: false }));
			}
		}
	};
})();
