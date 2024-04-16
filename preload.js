const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  writeFile: async (chemin, contenu) => {
    try {
      await ipcRenderer.invoke('writeFile', chemin, contenu);
    } catch (erreur) {
      console.error('Erreur lors de l\'écriture dans le fichier :', erreur);
    }
  },
  
  setWinScreen: async (width, height) => {
    try {
      await ipcRenderer.invoke('setWinScreen', width, height);
    } catch (erreur) {
      console.error('setWinScreen error :', erreur);
    }
  },

  getInfoUser: async () => {
    try {
      await ipcRenderer.invoke('getInfoUser');
    } catch (erreur) {
      console.error('getInfoUser error :', erreur);
    }
  },
  
  // Autre
  RecupDataBaseIPC: async (nomBase, Table, email, colone, motDePasse, colone2) => {
    try {
      let value = await ipcRenderer.invoke('RecupDataBaseIPC', nomBase, Table, email, colone, motDePasse, colone2);
      return value;
    } catch (erreur) {
      console.error('RecupDataBaseIPC error :', erreur);
    }
  },

  newUserDataBase: async (username, password, email) => {
    try {
      let getNew = await ipcRenderer.invoke('newUserDataBase', username, password, email);
      return getNew;
    } catch (erreur) {
      console.error('newUserDataBase error :', erreur);
    }
  },

  getConnected: async () => {
    try {
      let value = await ipcRenderer.invoke('getConnected');
      return value;
    } catch (erreur) {
      console.error('getConnected error :', erreur);
    }
  },

  setConnected: async (newValue) => {
    try {
      let value = await ipcRenderer.invoke('setConnected', newValue);
      return value;
    } catch (erreur) {
      console.error('setConnected error :', erreur);
    }
  }

});