function isMainProcess(filename) {
    return require.main.filename === filename;
}

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charLen = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charLen));
    }
    return result;
}

module.exports = {
    isMainProcess,
    makeid
}
