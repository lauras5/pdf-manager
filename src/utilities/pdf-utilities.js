const {execute} = require('@almaclaine/mysql-utils');
const path = require('path');
const fs = require('fs');
const {PDFDocument} = require('pdf-lib');

async function createDatabase(dbInfo) {
    const createDb = 'CREATE DATABASE IF NOT EXISTS pdf_manager;';
    await execute(dbInfo, createDb);
}

async function createPdfTable(dbInfo) {
    const createPdfTable = `CREATE TABLE IF NOT EXISTS pdf (
        pdf_id INT NOT NULL UNIQUE AUTO_INCREMENT,
        date_added timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        size INT NOT NULL,
        name VARCHAR(512) NOT NULL,
        pages INT NOT NULL,
        file_location VARCHAR(1024) NOT NULL,
        parent_id INT DEFAULT NULL,
        PRIMARY KEY(pdf_id),
        FOREIGN KEY (parent_id) REFERENCES pdf(pdf_id)
    );`
    await execute(dbInfo, createPdfTable);
}

async function addPdf(dbInfo, filePath, parent = '') {
    const name = path.basename(filePath.replace('.pdf', ''));
    let sql = `INSERT INTO pdf (size, name, pages, file_location`;
    if (parent) {
        sql += ', parent_id) VALUES (?, ?, ?, ?, ?);'
    } else {
        sql += ') VALUES (?, ?, ?, ?)';
    }
    const size = fs.statSync(filePath).size;
    const pdfDoc = await PDFDocument.load(fs.readFileSync(filePath));
    const pages = pdfDoc.getPageCount();
    if (parent) {
        return (await execute(dbInfo, sql, [size, name, pages, filePath, parent])).insertId;
    } else {
        return (await execute(dbInfo, sql, [size, name, pages, filePath])).insertId;
    }
}

async function getPdf(dbInfo, pdf_id = '') {
    const sql = `SELECT * FROM pdf WHERE pdf_id = ? LIMIT 1;`;
    return (await execute(dbInfo, sql, [pdf_id]))[0];
}

async function getPdfs(dbInfo, page = 0, limit = 20) {
    const sql = `SELECT * FROM pdf LIMIT ? OFFSET ?;`;
    return (await execute(dbInfo, sql, [limit, (page * limit)]));
}

async function getChildrenPdfs(dbInfo, parent_id, page = 0, limit = 20) {
    const sql = `SELECT * FROM pdf WHERE parent_id = ? LIMIT ? OFFSET ?;`;
    return (await execute(dbInfo, sql, [parent_id, limit, (page * limit)]));
}

module.exports = {
    createDatabase,
    createPdfTable,
    addPdf,
    getPdfs,
    getPdf,
    getChildrenPdfs
}
