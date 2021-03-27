const {execute} = require('@almaclaine/mysql-utils');

async function createPdfTagTable(dbInfo) {
    const createPdfTable = `CREATE TABLE IF NOT EXISTS pdf_tag (
        pdf_id VARCHAR(128) NOT NULL,
        tag_id VARCHAR(16) NOT NULL,
        PRIMARY KEY(pdf_id, tag_id),
        FOREIGN KEY (pdf_id) REFERENCES pdf(pdf_id),
        FOREIGN KEY (tag_id) REFERENCES tag(tag_id)
    );`
    await execute(dbInfo, createPdfTable);
}

async function addPdfTag(dbInfo, pdf_id, tag_id) {
    const sql = `INSERT INTO pdf_tag (pdf_id, tag_id) VALUES (?, ?);`;
    await execute(dbInfo, sql, [pdf_id, tag_id]);
}

async function deletePdfTag(dbInfo, pdf_id, tag_id) {
    const sql = `DELETE FROM pdf_tag where pdf_id = ? AND tag_id = ?;`;
    await execute(dbInfo, sql, [pdf_id, tag_id]);
}

async function listPdfTagsByPdfId(dbInfo, pdf_id, page = 0, limit = 20) {
    const sql = `SELECT * FROM pdf_tag where pdf_id = ? LIMIT ? OFFSET ?;`;
    return (await execute(dbInfo, sql, [pdf_id, limit, (page * limit)]));
}

async function listPdfTagsByTagId(dbInfo, tag_id, page = 0, limit = 20) {
    const sql = `SELECT * FROM pdf_tag where tag_id = ? LIMIT ? OFFSET ?;`;
    return (await execute(dbInfo, sql, [tag_id, limit, (page * limit)]));
}

module.exports = {
    createPdfTagTable,
    addPdfTag,
    listPdfTagsByPdfId,
    listPdfTagsByTagId,
    deletePdfTag
};
