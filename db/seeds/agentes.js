/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('agentes').del()
  await knex('agentes').insert([
    {nome: 'Roberto Caieiro', dataDeIncorporacao: '2020-03-15', cargo: 'Policial'},
    {nome: 'Alvaro de Campos', dataDeIncorporacao: '2025-06-03', cargo: 'Investigador'}
  ]);
};
