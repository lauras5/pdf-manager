<script>
    import {onMount} from 'svelte';
    import {data, limit, page} from './stores.js';

    onMount(async () => {
        const res = await fetch('/api');
        $data = await res.json();
        // console.log(data)
    });

    function getPdfView() {

    }
</script>

{#each data as pdf}
    <li on:click={getPdfView}>
        <div>pdf.name</div>
        <div>pdf.size</div>
        <div>pdf.pages</div>
    </li>
{/each}

<style>
    li {
        display:flex;
        justify-content: space-between;
    }
</style>