<script>
    import {onMount} from 'svelte';
    import {push} from 'svelte-spa-router'

    let limit = 20;
    let page = 0;
    let data = [];
    $: {
        (async () => {
            const res = await fetch(`/api/pdf?limit=${limit}&page=${page}&reverse=true`);
            data = await res.json();
        })();
    }

    onMount(() => {
        document.body.addEventListener('keydown', (e) => {
            if(e.key === 'ArrowLeft') {
                if(page > 0) page--;
            }
            if(e.key === 'ArrowRight') {
                page++;
            }
        });
    });
</script>
<label>
    Results
    <input type="number" bind:value={limit}>
</label>
<label>
    Page
    <input type="number" bind:value={page}>
</label>
<div class="pdf-table-container">
    <table>
        <tr>
            <th>Name</th>
            <th>Size</th>
            <th>Pages</th>
            <th>Date</th>
        </tr>
        {#each data as pdf, i}
            <tr on:click={() => push(`/pdf?pdf_id=${pdf.pdf_id}`)}>
                <td>{pdf.name}</td>
                <td style="text-align: center;">{(pdf.size / 10 ** 6).toFixed(2)}MB</td>
                <td style="text-align: center;">{pdf.pages}</td>
                <td style="text-align: center;">{pdf.date_added.split('T')[0]}</td>
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
        background-color: rgba(128, 128, 136, .2);
    }

    tr:hover {
        background-color: rgba(136, 128, 128, .4);
    }

    .pdf-table-container {
        height: 100%;
        display: flex;
        justify-content: center;
    }

    table {
        margin: 64px;
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
