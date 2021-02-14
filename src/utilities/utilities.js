function isMainProcess(filename) {
    return require.main.filename === filename;
}

module.exports = {
    isMainProcess
}
