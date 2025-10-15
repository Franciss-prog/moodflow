<script lang="ts">
	import { page } from '$app/state';
	import axios from 'axios';
	import { toast, Toaster } from 'svelte-sonner';
	import Loading from './Loading.svelte';
	import { goto } from '$app/navigation';

	const currentPath = page.url.pathname;
	const isLogin = currentPath === '/auth';
	const isRegister = currentPath === '/auth/register';

	let username = '';
	let email = '';
	let password = '';
	let loading = false;

	const handleSuccess = (message: string) => {
		toast.success(message, { duration: 1000 });
		setTimeout(() => {
			goto('/dashboard');
		}, 1500);
	};

	const handleAuth = async (e: Event, type: 'login' | 'register') => {
		e.preventDefault();
		loading = true;

		// basic validation
		if (!username || !password || (type === 'register' && !email)) {
			toast.error('Please fill in all required fields', { duration: 1200 });
			return;
		}

		const payload = type === 'login' ? { username, password } : { email, username, password };

		try {
			const response = await axios.post(
				`/api/auth${type === 'register' ? '/register' : ''}`,
				payload
			);

			if (response.status === 200) {
				handleSuccess(response.data.message);
			}
		} catch (error) {
			toast.error(axios.isAxiosError(error) ? error.response?.data?.error : 'Unexpected error');
		} finally {
			loading = false;
			if (type === 'login') {
				username = '';
				password = '';
			}
		}
	};

	const style = () => {
		return `w-full rounded-md border px-4 py-2 focus:outline-none bg-transparent`;
	};
</script>

<Toaster richColors />
<div class="flex h-[70vh] items-center justify-center">
	<div class="w-full max-w-md rounded-lg bg-subLight p-8 shadow-md dark:bg-subDark">
		<span class="text-2xl">{isLogin ? 'Welcome Back!' : 'Welcome to Moodflow!'}</span>
		<form
			on:submit={(e) => handleAuth(e, isLogin ? 'login' : 'register')}
			class="mt-6 flex flex-col space-y-5"
		>
			<div>
				<input type="text" placeholder="Username" class={style()} bind:value={username} required />
			</div>
			<div>
				{#if isRegister}
					<input type="email" placeholder="Email" class={style()} bind:value={email} required />
				{/if}
			</div>
			<div>
				<input
					type="password"
					placeholder="Password"
					class={style()}
					bind:value={password}
					required
				/>
			</div>
			<div class="flex flex-col gap-3">
				<button
					disabled={loading}
					type="submit"
					class={`w-full rounded-md bg-dark px-4 py-2 text-light transition dark:bg-light dark:text-dark 
						${loading ? 'cursor-not-allowed opacity-50' : 'hover:bg-dark/80 hover:dark:bg-light/80'} flex justify-center`}
				>
					{#if loading}
						<Loading />
					{:else}
						{isLogin ? 'Login' : 'Register'}
					{/if}
				</button>
				<a
					href={isLogin ? '/auth/register' : '/auth'}
					class="mt-2 text-center text-sm text-gray-600 hover:underline dark:text-light/70"
				>
					{isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
				</a>
			</div>
		</form>
	</div>
</div>
