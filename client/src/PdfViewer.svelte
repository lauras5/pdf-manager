<script>
    import {onMount} from 'svelte';
    import {querystring} from 'svelte-spa-router'
    import queryString from 'query-string';

    const {pdf_id} = queryString.parse($querystring);

    let title = '';

    onMount(async () => {
       const res = await fetch(`/api/pdf?pdf_id=${pdf_id}`);
       title = (await res.json()).name;
    });
</script>

<iframe title={title} src={`/api/pdf/file?pdf_id=${pdf_id}`} height="600px" width="100%"></iframe>
