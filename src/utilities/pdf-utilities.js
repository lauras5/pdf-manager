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
        PRIMARY KEY(pdf_id)
    );`
    await execute(dbInfo, createPdfTable);
}

async function addPdf(dbInfo, filePath){
    const name = path.basename(filePath.replace('.pdf', ''));
    const sql = `INSERT INTO pdf (size, name, pages, file_location) VALUES (?, ?, ?, ?)`;
    const size = fs.statSync(filePath).size;
    const pdfDoc = await PDFDocument.load(fs.readFileSync(filePath));
    const pages = pdfDoc.getPageCount();
    const res = await execute(dbInfo, sql, [size, name, pages, filePath]);
    return res.insertId;
}

async function getPdfs(dbInfo, page = 0, limit = 20) {
    const sql = `SELECT * FROM pdf LIMIT ? OFFSET ?;`;
    return (await execute(dbInfo, sql, [limit, (page * limit)]));
}

module.exports = {
    createDatabase,
    createPdfTable,
    addPdf,
    getPdfs
}
