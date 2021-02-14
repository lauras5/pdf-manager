export function isMainProcess(filename) {
    return require.main.filename === filename;
}
