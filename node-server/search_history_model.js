const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'database',
  database: 'searchhistory_database',
  password: 'test123',
  port: 5432,
});

const getAllSearchHistory = () => {
  return new Promise(function (resolve, reject) {
    pool.query('SELECT * FROM search_history ORDER BY id ASC', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results?.rows);
    })
  })
}
const createSearchHistory = (body) => {
  return new Promise(function (resolve, reject) {
    const { text } = body
    pool.query('INSERT INTO search_history (text) VALUES ($1) RETURNING *', [text], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`A new search history has been added added`)
    })
  })
}
const deleteAllSearchHistory = () => {
  return new Promise(function (resolve, reject) {
    pool.query('DELETE FROM search_history', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`All search history deleted`)
    })
  })
}

module.exports = {
  getAllSearchHistory,
  createSearchHistory,
  deleteAllSearchHistory,
}