<script>
    import {onMount} from 'svelte';
    import {data, limit, page, viewerActive, fileIndex} from './stores.js';
    import PdfViewer from './PdfViewer.svelte';

    onMount(async () => {
        const res = await fetch(`/api/pdf?limit=${$limit}&page=${$page}`);
        $data = await res.json();

        console.log($data)
    });

    function getPdfView(i) {
        $viewerActive = true;
        $fileIndex = i;
    }
</script>

{#if $viewerActive}
    <PdfViewer {...data}></PdfViewer>
{:else}
    {#each $data as pdf, i}
        <li on:click={() => getPdfView(i)}>
            <div>Name: {pdf.name}</div>
            <div>Size: {pdf.size}MB</div>
            <div>No. Pages: {pdf.pages}</div>
            <div>Location: {pdf.file_location}</div>
        </li>
    {/each}
{/if}

<style>
    li {
        display:flex;
        flex-direction: column;
        padding:5px;
        border:1px solid lightgrey;
    }
    li:hover {
        background-color:lightgrey;
    }
</style>
