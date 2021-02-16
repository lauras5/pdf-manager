<script>
    import {push} from 'svelte-spa-router'

    export let pdf = {};
</script>

<tr on:click={() => push(`/pdf?pdf_id=${pdf.pdf_id}`)}>
    <td>{pdf.name}</td>
    <td style="text-align: center;">{(pdf.size / 10 ** 6).toFixed(2)}MB</td>
    <td style="text-align: center;">{pdf.pages}</td>
    <td style="text-align: center;">{pdf.date_added.split('T')[0]}</td>
</tr>

<style>
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
