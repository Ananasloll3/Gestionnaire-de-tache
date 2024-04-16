
document.getElementById("task-input").addEventListener('click', async () => {
    console.log("connected = " + await electronAPI.getConnected());
});