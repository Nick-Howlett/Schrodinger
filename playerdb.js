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
            dead integer NOT NULL
        )
    `)


module.exports = {
    find_user : (tag, cb) => {
        const query = `SELECT
                            tag, dead
                        FROM
                            players
                        WHERE
                            tag = ?;`
        db.get(query, [tag], (err, row) => {
            if(err) console.error(err.message);
            return cb(row);
        })
    },

    register_user : (tag, dead) => {
        const query = `INSERT INTO
                            players (tag, dead) 
                        VALUES 
                            (?, ?);`
        db.run(query, [tag, dead])
    }
}