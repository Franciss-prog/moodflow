<script lang="ts">
	import { SignInButton } from 'svelte-clerk';
</script>

<!-- Hero Section -->
<section
	class="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-4 py-12 text-center sm:px-6 lg:px-8"
>
	<div class="flex flex-col items-center max-md:items-start max-md:text-start">
		<h2 class="text-4xl font-extrabold sm:text-5xl">Track Your Mood, Find Your Balance</h2>
		<p class="mt-4 text-lg">
			Understand your emotions with MoodTracker. Simple, private, and insightful.
		</p>
		<SignInButton>
			<button
				class="mt-6 rounded-md bg-dark px-6 py-3 text-light transition hover:bg-dark/80 dark:bg-light dark:text-dark hover:dark:bg-light/80"
			>
				Start Tracking Now
			</button>
		</SignInButton>
	</div>
</section>
