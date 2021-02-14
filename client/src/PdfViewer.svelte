<script>
    import {onMount} from 'svelte';
    import {data, limit, page} from './stores.js';

    let dataLen;
    let fileIndex = 0;
    let activePdf;
    let pdfTitle;

    onMount(async () => {
        dataLen = data.length;
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
        pdfTitle = data[fileIndex].pdf;
        activePdf = data[fileIndex].file_location;
    }

</script>

<iframe title={pdfTitle} src={activePdf} height="600px" width="100%"></iframe>
<button on:click={prevPage}>Previous</button>
<button on:click={nextPage}>Next</button>