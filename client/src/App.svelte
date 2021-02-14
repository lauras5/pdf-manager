<script>
    import {onMount} from 'svelte';
    import {data, limit, page, viewerActive, fileIndex} from './stores.js';
    import PdfViewer from './PdfViewer.svelte';

    onMount(async () => {
        const res = await fetch('/api');
        $data = await res.json();

        console.log($data)
    });

    function getPdfView(i) {
        $viewerActive = true;
        $fileIndex = i;
    }
</script>

{#if $viewerActive == true}
    <PdfViewer {...data}></PdfViewer>
{:else}
    {#each $data as pdf, i}
        <li on:click={() => getPdfView(i)}>
            <div>{pdf.name}</div>
            <div>{pdf.size}</div>
            <div>{pdf.file_location}</div>
        </li>
    {/each}
{/if}

<style>
    li {
        display:flex;
        justify-content: space-between;
        padding:5px;
        border:1px solid lightgrey;
    }
    li:hover {
        background-color:lightgrey;
    }
</style>
