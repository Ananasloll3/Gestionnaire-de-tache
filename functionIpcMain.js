async function newUserDataBaseIPC(username, password, email)
{
    const sqlite3 = require('sqlite3').verbose();

    let test = [];
    
    const db = new sqlite3.Database('./src/DATA/USER/USER.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database. (Create User)');
    });


    let a = db.serialize(async () => {
        //cherche si l'utilisateur est existant
        db.each(`SELECT * FROM user where username = '${username}'`, async (err, row) => {
            if (err) {
            console.error("Erreur lors de la recherche :\n" + err.message);
            }
            try{
                console.log(row);
            }
            catch{
                console.log("pas de doublon");
                return;
            }
        });



        //cherche si le mail est existant
        db.each(`SELECT * FROM user where email = '${email}'`, async (err, row) => {
           if (err) {
            console.error("Erreur lors de la recherche :\n" + err.message);
            }
            try{
                console.log(row.email);
                test.push(row.email);
            }
            catch{
                console.log("pas de doublon");
                return;
            }
            test.push(row.email);
        });


        console.log(test);
    
        if (test[0] === username) {
            return 1;
        }
        if (test[1] === email) {
            return 1;
        }

        //Cree l'utilisateur
        db.each(`INSERT INTO user (username, password, email) VALUES ('${username}', '${password}', '${email}')`, (err, row) => {
            if (err) {
            console.error("Erreur dans la creation nouvelle user :\n" + err.message);
            }
            console.log(row);
        });
    });

    
    // Fermer la connexion à la base de données après avoir terminé
    db.close((err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Close the database connection. (Create User)');
    return a;
    });

}



module.exports = {newUserDataBaseIPC};