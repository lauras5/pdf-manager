<script>
    import {push} from 'svelte-spa-router'

    export let pdf = {};
    let children = [];

    $: {
        (async () => {
            const {pdf_id} = pdf;
            const res = await fetch(`/api/pdf?parent_id=${pdf_id}`);
            children = await res.json();
        })();
    }

    let open = false;

</script>

{#if open}
    <div class="modal" on:click|self={() => open = false}>
        <div class="pdfs">
            <div class="result" on:click={() => push(`/pdf?pdf_id=${pdf.pdf_id}`)}>{pdf.name}</div>
            {#each children as child}
                <div class="result" on:click={() => push(`/pdf?pdf_id=${child.pdf_id}`)}>{child.name}</div>
            {/each}
        </div>
    </div>
{/if}

<tr on:click={() => open = true}>
    <td>{pdf.name}</td>
    <td style="text-align: center;">{(pdf.size / 10 ** 6).toFixed(2)}MB</td>
    <td style="text-align: center;">{pdf.pages}</td>
    <td style="text-align: center;">{pdf.date_added.split('T')[0]}</td>
</tr>

<style>
    .result:hover {
        background-color: lightgray;
    }

    .result {
        font-size: 24px;
        padding: 12px;
    }

    .modal {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .7);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .pdfs {
        background-color: white;
    }

    tr {
        margin: 0;
        padding: 0;
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
</style>
