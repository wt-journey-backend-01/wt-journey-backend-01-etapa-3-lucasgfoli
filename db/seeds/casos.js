/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('casos').del()
  await knex('casos').insert([
    {titulo: 'Roubo ao banco', descricao: 'Roubo ao banco na data 2025-07-21', status: 'aberto', agente_id: 1},
    {titulo: 'Homicídio no Shopping Cidade', descricao: 'Investigação em andamento', status: 'aberto', agente_id: 2}
  ]);
};
