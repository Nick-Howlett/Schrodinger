const sqlite3 = require('sqlite3');

const db = this.db = new sqlite3.Database(`${__dirname}/../db/players.db`, err => {
    if(err){
        console.error(err.message);
        return;
    }
    console.log("Connected to players database");
});

function create_table() {
    db.run(
    `CREATE TABLE IF NOT EXISTS 
        players( 
            id integer PRIMARY KEY, 
            tag VARCHAR(255) NOT NULL UNIQUE, 
            human integer NOT NULL
        )
    `);
}
create_table();

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

    update_user : (tag, human) => {

        const query = `UPDATE
                            players
                        SET 
                            human = ?
                        WHERE
                            tag = ?;`;
        db.run(query, [human, tag], err =>{
            if(err) console.error(err.message);
        });
    },

    reset_table : () => {
        db.run("DROP TABLE players;");
        create_table();
    }
};