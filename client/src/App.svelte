<script>
    import {onMount} from 'svelte';
    import PdfList from './PdfList.svelte';
    import PdfViewer from './PdfViewer.svelte'
    import Router from 'svelte-spa-router'

    const routes = {
        // Exact path
        '/': PdfList,
        '/pdf': PdfViewer,

        // Catch-all
        // This is optional, but if present it must be the last
        '*': PdfList
    }
</script>

<Router {routes}/>
