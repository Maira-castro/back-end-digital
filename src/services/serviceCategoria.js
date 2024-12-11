const Categoria = require('../models/tabelaCategoria')

//PESQUISAR CATEGORIA
const getCategoria = async ({ limit, page, fields, filters }) => {
  const { use_in_menu } = filters;

  // Verifica se 'use_in_menu' e 'id' estão presentes em 'fields', caso contrário, adiciona-os
  if (!fields.includes('id')) {
    fields.push('id');
  }
  if (!fields.includes('use_in_menu')) {
    fields.push('use_in_menu');
  }

  // Configurações de paginação
  const options = {
    where: use_in_menu !== undefined ? { use_in_menu } : {}, // Aplica o filtro de 'use_in_menu' se fornecido
    limit: limit === -1 ? undefined : limit, // Se limit é -1, não aplica limite (undefined)
    offset: limit === -1 ? 0 : (page - 1) * limit, // Calcula o offset para paginação, mas sem offset se limit for -1
    attributes: fields, // Seleciona apenas os campos definidos na query
  };

  try {
    const categories = await Categoria.findAndCountAll(options);

    // Retorna os dados com 'id' e 'use_in_menu' incluídos nas categorias
    return {
      data: categories.rows,
      total: categories.count,
    };
  } catch (error) {
    throw new Error('Erro ao buscar categorias: ' + error.message);
  }
};

//OBTER CATEGORIA PELO ID
const getCategoriaById = async (id) => {
  try {
    const category = await Categoria.findByPk(id);  // findByPk busca por ID primário
    return category;  // Retorna a categoria encontrada ou null
  } catch (error) {
    console.error('Erro ao buscar categoria no banco de dados:', error);
    throw error;
  }
};

//ATUALIZAR CATEGORIA
const updateCategoria = async (id, { name, slug, use_in_menu }) => {
  try {
    // Busca a categoria pelo ID
    const category = await Categoria.findByPk(id);

    // Verifica se a categoria existe
    if (!category) {
      throw new Error('Categoria não encontrada');
    }

    // Atualiza os campos
    category.name = name;
    category.slug = slug;
    category.use_in_menu = use_in_menu;

    // Salva as alterações no banco de dados
    await category.save();

    return category; // Retorna a categoria atualizada
  } catch (error) {
    console.error('Erro ao atualizar categoria:', error);
    throw new Error('Erro ao atualizar categoria: ' + error.message);
  }
};

//CRIAR CATEGORIA
const createCategoria = async ({ name, slug, use_in_menu }) => {
  try {

    const novaCategoria = await Categoria.create({
      name,
      slug,
      use_in_menu: use_in_menu || false,
    });
    return novaCategoria;
  } catch (error) {
    console.error('erro ao criar categoria:', error);
    throw error;
  }
};

//DELETAR CATEGORIA
const deletarCategoria = async (id) => {
  try {
    const category = await Categoria.findByPk(id);

    if (!category) {
      return null; // Retorna null se não encontrar a categoria
    }

    // Deleta a categoria
    await category.destroy();

    // Retorna uma mensagem de sucesso
    return { message: 'Categoria deletada com sucesso' };
  } catch (error) {
    console.error('Erro ao deletar categoria:', error);
    throw new Error('Erro ao deletar categoria: ' + error.message);
  }
};

module.exports = {
  createCategoria,
  getCategoria,
  getCategoriaById,
  updateCategoria,
  deletarCategoria,
}