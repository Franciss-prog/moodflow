<script lang="ts">
	// imports
	import { moods, hoverBG, dynamicBG } from '$lib';
	import { overAllMood } from '$lib/stores/mood';
	import { page } from '$app/state';
	import { LogOut } from '@lucide/svelte';
	let selectedMood = 'happy';
	import axios from 'axios';
	import { Toaster, toast } from 'svelte-sonner';
	import Loading from '$lib/components/auth/Loading.svelte';
	import { invalidate } from '$app/navigation';

	// variables
	let why = '';
	let loading = false;

	// functions
	const onSendMood = async (e: Event) => {
		e.preventDefault();
		loading = true;

		// make the why optional
		if (!why.trim()) {
			why = `No reason, I'm just ${selectedMood}`;
		}

		try {
			const response = await axios.post('/api/mood/add', { mood: selectedMood, why });
			console.log(response.data);
			if (response.status === 200) {
				toast.success(response.data.message, { duration: 1000 });
				why = '';
				loading = false;
				await invalidate();
			}
		} catch (error) {
			if (axios.isAxiosError(error)) {
				toast.error(error.response?.data.error || 'Something went wrong', { duration: 1200 });
				why = '';
				loading = false;
			}
		}
	};
	const onLogout = async () => {
		try {
			const response = await axios.get('/api/logout');
			toast.success(response.data.message, { duration: 1000 });

			// reload the page to update cookies is removed and notice the authguard
			setTimeout(() => {
				window.location.reload();
				window.location.pathname = '/auth';
			}, 1001);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				toast.error(error.response?.data.error || 'Something went wrong');
			}
		}
	};
</script>

<Toaster richColors />
<nav class="flex h-20 w-full items-center justify-between">
	<a href="/">{page.data.username}</a>
	<button
		class="text-md rounded-md bg-dark p-2 text-light hover:bg-dark/80 dark:bg-light dark:text-dark dark:hover:bg-light/80"
		on:click={onLogout}><LogOut /></button
	>
</nav>
<section class="mt-7 h-[80vh]">
	<div class="flex h-full w-full flex-col items-center justify-between">
		<form
			class="flex h-full w-full flex-col items-start gap-10 rounded-xl bg-subLight p-5 text-start dark:bg-subDark"
			on:submit={onSendMood}
		>
			<span class="text-5xl">What is your mood Today? </span>

			<!-- mood buttons -->
			<div class="flex items-center gap-4">
				{#each moods as { mood, icon } (mood)}
					<button
						type="button"
						value={mood}
						class={`${
							selectedMood === mood
								? 'dark:bg-light dark:text-dark'
								: 'dark:hover:bg-light dark:hover:text-dark'
						} rounded-xl transition-all`}
						on:click={() => (selectedMood = mood)}
					>
						<svelte:component this={icon} aria-label={mood} class="h-12 w-12" />
					</button>
				{/each}
			</div>

			<!-- textarea with red border if error -->
			<div class="flex h-full w-full flex-col gap-2">
				<textarea
					bind:value={why}
					class="h-full w-full resize-none rounded-md border bg-transparent p-2 text-black outline-none dark:text-white"
					placeholder={`Why are you ${selectedMood}?`}
				></textarea>
			</div>

			<button
				class={`${hoverBG} rounded-lg ${dynamicBG} flex w-full justify-center p-2`}
				disabled={loading}
				on:submit={onSendMood}
			>
				{#if loading}
					<Loading />
				{:else}
					Submit Mood
				{/if}
			</button>
		</form>
	</div>
</section>
