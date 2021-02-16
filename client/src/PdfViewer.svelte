<script>
    import {onMount} from 'svelte';
    import {querystring} from 'svelte-spa-router'
    import queryString from 'query-string';

    const {pdf_id} = queryString.parse($querystring);

    let title = '';
    let children = '';

    async function handleAddChildren() {
        const pageList = children.split(",")
            .map(e => e.replace(/ $/, '').replace(/^ /, ''))
            .map(e => parseInt(e))
            .filter(e => !isNaN(e));
        await fetch(`/api/pdf/file?pdf_id=${pdf_id}&pages=${JSON.stringify(pageList)}`, {method: 'POST'});
        children = '';
    }

    onMount(async () => {
        const res = await fetch(`/api/pdf?pdf_id=${pdf_id}`);
        title = (await res.json()).name;
    });

</script>

<label>
    <input type="text" placeholder="separate pages by commas" bind:value={children}>
    <button on:click={handleAddChildren}>Submit</button>
</label>
<iframe title={title} src={`/api/pdf/file?pdf_id=${pdf_id}`}></iframe>

<style>
    iframe {
        width: 100%;
        height: 100%;
    }
</style>
