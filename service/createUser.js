const bcrypt = require('bcrypt');
const pool = require('../db'); 
async function createUser() {
  const nome = "alice"; 
  const email = "alicepuppo@gmail.com"; 
  const telefone = "010203040"; 
  const senhaPlana = "3001"; 

  try {
    const senhaCriptografada = await bcrypt.hash(senhaPlana, 10);
    const result = await pool.query('INSERT INTO users (nome, telefone, email, senhahash) VALUES ($1, $2, $3, $4) RETURNING *', 
    [nome, telefone, email, senhaCriptografada]);

    console.log('Usuário criado:', result.rows[0]);
  } catch (err) {
    console.error('Erro ao criar usuário:', err);
  }
}

createUser();
module.exports = {createUser}
