<script>
    import {onMount} from 'svelte';

    let data = [];

    onMount(async () => {
        const res = await fetch('/api');
        data = await res.json();
        console.log(data)
    });
</script>

{#each data as pdf}
    <li>
        <div>pdf.pdf</div>
        <div>pdf.size</div>
    </li>
{/each}

<style>
    li {
        display:flex;
        justify-content: space-between;
    }
</style>