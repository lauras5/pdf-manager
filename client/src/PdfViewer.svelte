<script>
    import {onMount} from 'svelte';
    import {data, viewerActive, fileIndex} from './stores.js';

    let dataLen;
    let activePdf;
    let pdfTitle;

    onMount(async () => {
        dataLen = $data.length;
        updatePage();
    });

    function nextPage() {
        if ($fileIndex === (dataLen - 1))
            $fileIndex = 0;
        else
            $fileIndex++;

        updatePage();
    }

    function prevPage() {
        if ($fileIndex === 0)
            $fileIndex = dataLen - 1;
        else
            $fileIndex--;

        updatePage();
    }

    function updatePage() {
        pdfTitle = $data[$fileIndex].name;
        activePdf = $data[$fileIndex].file_location;
    }

</script>

<button on:click={() => {$viewerActive = false}}>Home</button>
<iframe title={pdfTitle} src={activePdf} height="600px" width="100%"></iframe>
<button on:click={prevPage}>Previous</button>
<button on:click={nextPage}>Next</button>
