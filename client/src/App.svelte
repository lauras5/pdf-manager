<script>
    import {onMount} from 'svelte';
    import {data, limit, page} from './stores.js';

    let dataLen;
    let fileIndex = 0;
    let activePdf;
    let pdfTitle;

    onMount(async () => {
        const res = await fetch('/api');
        $data = await res.json();
        console.log(data)
        dataLen = data.data.length;
        updatePage();
    });

    function nextPage() {
        if (fileIndex == (dataLen - 1))
            fileIndex = 0;
        else
            fileIndex++;

        updatePage();
    }

    function prevPage() {
        if (fileIndex == 0)
            fileIndex = dataLen - 1;
        else
            fileIndex--;

        updatePage();
    }

    function updatePage() {
        pdfTitle = data.data[fileIndex].pdf;
        activePdf = data.data[fileIndex].file_location;
    }

</script>

<style>
    h1 {
        color: purple;
    }
</style>

<h1>Hello world!</h1>

<iframe title={pdfTitle} src={activePdf} height="600px" width="100%"></iframe>
<button on:click={prevPage}>Previous</button>
<button on:click={nextPage}>Next</button>