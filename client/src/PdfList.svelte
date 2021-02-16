<script>
    import {onMount} from 'svelte';
    import PdfResult from "./PdfResult.svelte";

    let limit = 20;
    let page = 0;
    let data = [];
    let order = 'asc';
    let orderedBy = 'name';
    let term = '';
    let tags = [];
    let displayTags = [];
    let activeTags = [];

    $: {
        (async () => {
            const res = await fetch(`/api/pdf?limit=${limit}&page=${page}&order=${order}&order_by=${orderedBy}&term=${term}`);
            data = await res.json();
        })();
    }

    async function orderBy(type) {
        if (order === 'desc' && orderedBy === type) {
            order = 'asc';
        } else {
            order = 'desc';
            orderedBy = type;
        }

        const res = await fetch(`/api/pdf?limit=${limit}&page=${page}&order=${order}&order_by=${orderedBy()}&term=${term}`);
        data = await res.json();
    }

    async function findTags() {
        if (term.length > 0) {
            for (let b of tags) {
                if (b.tag.match(term) && activeTags.map(tag => tag.tag_id).indexOf(b.tag_id) < 0) {
                    displayTags = [...displayTags, b]
                }
            }
        } else {
            displayTags = [];
            await makeFilteredCall();
        }
    }

    async function searchByTag(tag) {
        if (activeTags.map(tag => tag.tag_id).indexOf(tag.tag_id) < 0) {
            activeTags = [...activeTags, tag];
        }

        let removeIndex = displayTags.map(tag => tag.tag_id).indexOf(tag.tag_id);
        displayTags.splice(removeIndex, 1)
        displayTags = [...displayTags];

        await makeFilteredCall();
    }

    async function removeActiveTag(tag) {
        let removeIndex = activeTags.map(tag => tag.tag_id)
            .indexOf(tag.tag_id);
        activeTags.splice(removeIndex, 1);
        activeTags = [...activeTags];
        displayTags = [...displayTags, tag];

        await makeFilteredCall();
    }

    async function makeFilteredCall() {
        let ids = [];
        for (let t of activeTags) {
            let fetchCall = `/api/tag/pdf?tag_id=${t.tag_id}`;
            const res = await fetch(fetchCall);
            let list = await res.json();
            for (let l of list) {
                let found = ids.map(id => id.pdf_id).indexOf(l.pdf_id);
                if (found < 0) {
                    ids.push(l);
                }
            }
        }

        let pdfs = [];
        for (let i of ids) {
            let fetchCall = `/api/pdf?pdf_id=${i.pdf_id}`;
            const res = await fetch(fetchCall);
            pdfs.push(await res.json());
        }

        data = [...pdfs];
    }

    onMount( async () => {
        document.body.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                if (page > 0) page--;
            }
            if (e.key === 'ArrowRight') {
                if (data.length === limit) {
                    page++;
                }
            }
        });

        let res = await fetch(`/api/tag`);
        tags = await res.json();
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
<label>
    Search
    <input type="text" bind:value={term} on:keyup={findTags}>
</label>

<div class="tag-div">
    {#each activeTags as a}
        <div
                class="active-tag"
                on:click={()=>removeActiveTag(a)}>
            {a.tag}
        </div>
    {/each}
    {#each displayTags as t}
        <div
                class="inactive-tag"
                on:click={()=>searchByTag(t)}>
            {t.tag}
        </div>
    {/each}
</div>

<div class="pdf-table-container">
    <table>
        <tr>
            <th on:click={()=>orderBy('name')}>Name</th>
            <th on:click={()=>orderBy('size')}>Size</th>
            <th on:click={()=>orderBy('pages')}>Pages</th>
            <th on:click={()=>orderBy('date_added')}>Date</th>
        </tr>
        {#each data as pdf}
            <PdfResult pdf={pdf}/>
        {/each}
    </table>
</div>

<style>
    th {
        margin: 0;
        padding: 16px;
        background-color: black;
        color: white;
        font-family: Helvetica, serif;
    }

    th:hover {
        color:black;
        background-color:white;
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

    .tag-div {
        display: flex;
        flex-wrap: wrap;
    }

    .inactive-tag {
        margin: 0 10px 0 10px;
        background: black;
        color:white;
        border-radius: 20px;
        padding:2px 10px 2px 10px;
    }
    .active-tag {
        margin: 0 10px 0 10px;
        background: darkred;
        color:white;
        border-radius: 20px;
        padding:2px 10px 2px 10px;
    }
    .inactive-tag:hover {
        background: #a5a5a5;
    }
    .active-tag:hover {
        background: indianred;
    }
</style>
