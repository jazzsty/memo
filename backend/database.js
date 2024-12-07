const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'memo',
  connectionLimit: 5,
  waitForConnections: false
});

async function GetMemosList(){
  let conn, rows;
  try{
    conn = await pool.getConnection();
    // conn.query('USE memo');
    rows = await conn.query('SELECT * FROM memos');
  }
  catch(err){
    throw err;
  }
  finally{
    if (conn) conn.release();
  }
  return rows;
}
 
async function PostMemosInput(content){
  let conn, result;
  try{
    conn = await pool.getConnection();
    console.log("Database connection established");
    // conn.query('USE memo');
    const sql = 'INSERT INTO memos (content) VALUES (?)';
    console.log("Executing SQL:", sql);
    
    result = await conn.query(sql, [content]);
    console.log("Query result:", result);

    return result;
  }
  catch (err) {
      console.error('Error inserting memo:', err);
      throw err;
  }
  finally{
      if (conn) conn.release();
  }
  // return result;

}

async function PutMemosUpdate(id, content){
  let conn, result;
  try{
    conn = await pool.getConnection();
    console.log("Database connection established");
    // conn.query('USE memo');
    const sql = 'UPDATE memos SET content = ? WHERE id = ?';
    console.log("Executing SQL:", sql);
    
    result = await conn.query(sql, [content, id]);
    console.log("Query result:", result);
    
    return result;
  }
  catch (err) {
      console.error('Error inserting memo:', err);
      throw err;
  }
  finally{
      if (conn) conn.release();
  }
  // return result;

}

module.exports = { GetMemosList, PostMemosInput, PutMemosUpdate }