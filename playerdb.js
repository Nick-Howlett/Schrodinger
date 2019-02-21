const sqlite3 = require('sqlite3');

const db = this.db = new sqlite3.Database('./db/players.db', err => {
    if(err){
        console.error(error.message);
        return;
    }
    console.log("Connected to players database");
});

db.run(
    `CREATE TABLE IF NOT EXISTS 
        players( 
            id integer PRIMARY KEY, 
            tag VARCHAR(255) NOT NULL UNIQUE, 
            human integer NOT NULL
        )
    `);


module.exports = {
    find_user : (tag, cb) => {
        const query = `SELECT
                            tag, human
                        FROM
                            players
                        WHERE
                            tag = ?;`;
        db.get(query, [tag], (err, row) => {
            if(err) console.error(err.message);
            return cb(row);
        });
    },

    register_user : (tag, human) => {
        const query = `INSERT INTO
                            players (tag, human) 
                        VALUES 
                            (?, ?);`;
        db.run(query, [tag, human]);
    },

    update_user : (id, tag, human) => {
        const query = `UPDATE 
                            players
                        SET 
                            tag = ?, human = ?
                        WHERE
                            id = ?
                            `;
        db.run(query, [tag, id, human]);
    }
};