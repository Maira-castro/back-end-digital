const serviceCategoria = require('../services/serviceCategoria')
const Categoria = require('../models/tabelaCategoria')

// Função para buscar categorias com filtros
const getCategoria = async (req, res) => {
    const { limit = 12, page = 1, fields = 'name,slug', use_in_menu = null } = req.query;

    // Validação dos parâmetros de entrada
    if (isNaN(limit) || isNaN(page)) {
      return res.status(400).json({ message: 'Parâmetros limit e page devem ser números válidos' });
    }

    const fieldsArray = fields.split(',');

    // Montando os filtros
    const filters = {};
    if (use_in_menu !== null) {
      filters.use_in_menu = use_in_menu === 'true'; // Filtro de categorias para o menu
    }

    try {
      // Buscando as categorias com a lógica do serviço
      const result = await serviceCategoria.getCategoria({ limit, page, fields: fieldsArray, filters });

      return res.status(200).json({
        data: result.data,
        total: result.total,
        limit: parseInt(limit),
        page: parseInt(page),
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
};



const createCategoria = async (req, res) => {
    const {name, slug, use_in_menu} = req.body;

    if(!name || !slug){
        return res.status(400).json({ message:'name e slug sao necessarios.'});
    }
    try{
        const novaCategoria = await serviceCategoria.createCategoria({name,slug,use_in_menu});

        return res.status(201).json({
            id:novaCategoria.id,
            name:novaCategoria.name,
            slug:novaCategoria.slug,
            use_in_menu:novaCategoria.use_in_menu,
        });
    }catch(error) {
        return res.status(500).json({message:'erro interno no servidor'});
    }
};

module.exports = {
    createCategoria,
    getCategoria,
}