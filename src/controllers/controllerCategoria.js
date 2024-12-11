const serviceCategoria = require('../services/serviceCategoria')
const Categoria = require('../models/tabelaCategoria')

//PESQUISAR CATEGORIA
const getCategoria = async (req, res) => {
  let { limit = 12, page = 1, fields = 'name,slug', use_in_menu = null } = req.query;

  // Validação dos parâmetros limit e page
  limit = parseInt(limit);
  page = parseInt(page);

  if (isNaN(limit) || limit < -1) {
    return res.status(400).json({ message: 'O parâmetro limit deve ser um número válido maior ou igual a -1' });
  }

  if (isNaN(page) || page <= 0) {
    return res.status(400).json({ message: 'O parâmetro page deve ser um número válido maior que 0' });
  }

  const fieldsArray = fields.split(',');

  // Montando os filtros
  const filters = {};
  if (use_in_menu !== null) {
    filters.use_in_menu = use_in_menu === 'true'; // Filtro de categorias para o menu
  }

  // Verifica se limit é -1, se for, não aplica limite
  const queryLimit = limit === -1 ? null : limit;
  const queryPage = page;

  try {
    // Buscando as categorias com a lógica do serviço
    const result = await serviceCategoria.getCategoria({
      limit: queryLimit,
      page: queryPage,
      fields: fieldsArray,
      filters
    });

    return res.status(200).json({
      data: result.data,
      total: result.total,
      limit: queryLimit !== null ? queryLimit : 'Sem limite', // Informar se não houver limite
      page: queryPage,
    });
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    return res.status(500).json({ message: 'Erro interno ao buscar categorias', error: error.message });
  }
};


//OBTER CATEGORIA PELO ID
const getCategoriaById = async (req, res) => {
  const categoryId = req.params.id;

  try {
    const category = await serviceCategoria.getCategoriaById(categoryId);

    if (!category) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }

    return res.status(200).json({
      id: category.id,
      name: category.name,
      slug: category.slug,
      use_in_menu: category.use_in_menu,
    });
  } catch (error) {
    console.error('Erro ao buscar categoria:', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

//ATUALIZAR CATEGORIA
const updateCategoria = async (req, res) => {
  const { id } = req.params;
  const { name, slug, use_in_menu } = req.body;

  try {
    // Validações simples
    if (!name || !slug) {
      return res.status(400).json({ message: 'Os campos name e slug são obrigatórios.' });
    }
    // Atualiza a categoria usando o serviço
    const updatedCategory = await serviceCategoria.updateCategoria(id, { name, slug, use_in_menu });

    return res.status(204).send();
  } catch (error) {
    console.error('Erro ao atualizar categoria:', error);
    return res.status(404).json({ message: error.message });
  }
};

//CRIAR CATEGORIA
const createCategoria = async (req, res) => {
  const { name, slug, use_in_menu } = req.body;

  if (!name || !slug) {
    return res.status(400).json({ message: 'name e slug sao necessarios.' });
  }
  try {
    const novaCategoria = await serviceCategoria.createCategoria({ name, slug, use_in_menu });

    return res.status(201).json({
      id: novaCategoria.id,
      name: novaCategoria.name,
      slug: novaCategoria.slug,
      use_in_menu: novaCategoria.use_in_menu,
    });
  } catch (error) {
    return res.status(500).json({ message: 'erro interno no servidor' });
  }
};

//DELETAR CATEGORIA
const deletarCategoria = async (req, res) => {
  const { id } = req.params;

  try {
    // Chama o serviço para deletar a categoria
    const result = await serviceCategoria.deletarCategoria(id);

    // Se o resultado for vazio, a categoria não foi encontrada
    if (!result) {
      return res.status(404).json({ message: 'Categoria não encontrada.' });
    }

    // Retorna uma resposta de sucesso com a mensagem
    return res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar categoria:', error);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};

module.exports = {
  createCategoria,
  getCategoria,
  getCategoriaById,
  updateCategoria,
  deletarCategoria,
}