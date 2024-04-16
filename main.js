const { app, BrowserWindow, ipcMain } = require('electron');
const { connect } = require('node:http2');
const path = require('node:path')
const {newUserDataBaseIPC} = require ('./functionIpcMain')


let mainWindow;
let connected = false;
let arrayUser = [];

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 680,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });
  //mainWindow.loadFile('src/Page-Principale/index.html');
  mainWindow.loadFile('src/Login&Signup/login.html');

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', createWindow);


app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});






//-----------------------------------------------  API  -----------------------------------------------//



ipcMain.handle('setWinScreen', async (event, width, height) => {
    if (mainWindow){
      mainWindow.setSize(width, height);
    }
  });


ipcMain.handle('writeFile', async (event, chemin, contenu) => {
    const { writeFile } = require('fs/promises');
    try {
      await writeFile(chemin, contenu);
      return true;
    } catch (erreur) {
      console.error('Erreur lors de l\'écriture dans le fichier :', erreur);
      throw erreur;
    }
});

ipcMain.handle('getInfoUser', async (event) => {
  const { writeFile } = require('fs/promises');
  console.log(arrayUser);
  try {
    let contenu = arrayUser[0] + "\n" + arrayUser[1] + "\n" + arrayUser[2];
    await writeFile("./src/Login&Signup/tmp.temp", contenu);
  } catch (erreur) {
    console.error('Erreur lors de la recuperation connected :', erreur);
    throw erreur;
  }
});


ipcMain.handle('getConnected', async (event) => {

  try {
    console.log(connected);
    return connected;
  } catch (erreur) {
    console.error('Erreur lors de la recuperation connected :', erreur);
    throw erreur;
  }
});



ipcMain.handle('setConnected', async (event, newValue) => {
  
  try {
    if (typeof newValue === typeof connected) {
      connected = newValue;
    }
  } catch (erreur) {
    console.error('Erreur lors de la recuperation connected :', erreur);
    throw erreur;
  }
});


ipcMain.handle('newUserDataBase', async (event, username, password, email) => {

  try {
    let getNew = await newUserDataBaseIPC(username, password, email);
    return getNew;
  } catch (erreur) {
    console.error('Erreur lors de la recuperation connected :', erreur);
    throw erreur;
  }
});


ipcMain.handle('RecupDataBaseIPC', async (event, nomBase, table, email, colone, motDePasse, colone2) => {
  let a = false;
  let dbArray = [];
  try {
    const sqlite3 = require('sqlite3').verbose(); 

    // Il faut le chemin dans la var nomBase qui part depuis la racine
    const db = new sqlite3.Database(nomBase, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
    });

    // Exemple d'exécution de requête

    db.serialize( async () => {
        db.each(`SELECT * FROM ${table} WHERE ${colone} = '${email}' AND ${colone2} = '${motDePasse}';`, async (err, row) => {
          if (err) {
              console.log("error 404 :\n");
                console.error(err.message);
            }
            dbArray[0] = row.username;
            dbArray[1] = row.password;
            dbArray[2] = row.email; 
            console.log(dbArray);  
            a = true;             
        });
    });

    // Fermer la connexion à la base de données après avoir terminé
    db.close(async (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Close the database connection.');
    
    //test si reussi
    if (a) {
      connected = true;
      console.log("connecte");
      arrayUser[0] = dbArray[0];
      arrayUser[1] = dbArray[1];
      arrayUser[2] = dbArray[2];
      return a;
    }
    else
    {
      return a;
    }
    
    });

  } catch (erreur) {
    console.error('Erreur lors de l\'ouverture de la base de donnée :', erreur);
    throw erreur;
  }
});

