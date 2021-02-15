<script>
    import {onMount} from 'svelte';
    import {data, limit, page} from './stores.js';
    import {push} from 'svelte-spa-router'

    onMount(async () => {
        const res = await fetch(`/api/pdf?limit=${$limit}&page=${$page}`);
        $data = await res.json();
    });
</script>

<div class="pdf-table-container">
    <table>
        <tr>
            <th>Name</th>
            <th>Size</th>
            <th>Pages</th>
            <th>Parent</th>
        </tr>
        {#each $data as pdf, i}
            <tr on:click={() => push(`/pdf?pdf_id=${pdf.pdf_id}`)}>
                <td>Name: {pdf.name}</td>
                <td>Size: {(pdf.size / 10 ** 6).toFixed(2)}MB</td>
                <td>No. Pages: {pdf.pages}</td>
                <td>{pdf.parent_id || ''}</td>
            </tr>
        {/each}
    </table>
</div>

<style>
    tr {
        margin: 0;
        padding: 0;
    }

    th {
        margin: 0;
        padding: 16px;
        background-color: black;
        color: white;
        font-family: Helvetica, serif;
    }

    td {
        padding: 8px;
    }

    tr:nth-child(odd) {
        background-color: rgba(128,128,136, .2);
    }

    tr:hover {
        background-color: rgba(136,128,128, .4);
    }

    .pdf-table-container {
        height: 100%;
        display: flex;
        justify-content: center;
    }

    table {
        margin: 128px;
        width: 80vw;
        max-width: 1280px;
        border-spacing: 0;
    }

    li {
        display: flex;
        flex-direction: column;
        padding: 5px;
        border: 1px solid lightgrey;
    }

    li:hover {
        background-color: lightgrey;
    }
</style>
