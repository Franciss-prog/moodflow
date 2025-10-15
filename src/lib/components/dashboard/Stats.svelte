<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Chart } from 'chart.js/auto';
	import type { ChartData, ChartOptions } from 'chart.js/auto';
	import { page } from '$app/state';

	let chart: Chart<'pie'>;
	let canvas: HTMLCanvasElement;

	const { overAllMood, username } = page.data;

	const data: ChartData<'pie'> = {
		labels: Object.keys(overAllMood),
		datasets: [
			{
				label: 'Moods',
				data: Object.values(overAllMood),
				backgroundColor: ['#98FF98', '#CBAACB', '#1B2A41', '#FF0000']
			}
		]
	};

	const options: ChartOptions<'pie'> = {
		responsive: true,
		plugins: {
			legend: {
				position: 'bottom'
			}
		}
	};

	onMount(() => {
		chart = new Chart(canvas, {
			type: 'pie',
			data,
			options
		});
	});

	onDestroy(() => {
		chart?.destroy();
	});
</script>

{#if overAllMood}
	<section
		class="h-[80vh] rounded-xl bg-subLight p-2 text-subDark dark:bg-subDark dark:text-subLight"
	>
		<div class="flex h-full flex-col items-center justify-center">
			<span class="text-3xl">Moods Status for {username}</span>
			<div class="flex h-full items-center justify-center">
				<canvas
					bind:this={canvas}
					class="h-[60vh] w-[60vh] max-md:h-[40vh] max-md:w-[40vh] max-sm:h-[20vh] max-sm:w-[20vh]"
				></canvas>
			</div>
		</div>
	</section>
{/if}
