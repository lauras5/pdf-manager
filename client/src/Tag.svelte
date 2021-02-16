<script>
    export let tag_id = null;
    let tag = '';

    $: {
        (async () => {
            const res = await fetch(`/api/tag?tag_id=${tag_id}`);
            const data = await res.json();
            tag = data.tag;
        })();
    }

</script>

<div>{tag}</div>

<style>
    div {
        margin: 8px;
    }
</style>
