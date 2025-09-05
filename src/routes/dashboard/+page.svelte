<script lang="ts">
	import { SignedIn, UserButton } from 'svelte-clerk/client';
	import { page } from '$app/state';
	console.log(page.data.user.name);
</script>

<section class="mx-auto min-h-screen max-w-7xl px-4 py-12">
	<SignedIn>
		<UserButton afterSignOutUrl="/" />
	</SignedIn>
	<div class="flex h-full items-center justify-center">
		<span> welcome to Moodflow! {page.data.user.name} </span>
	</div>
</section>
