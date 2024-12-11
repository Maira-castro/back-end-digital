const Categoria = require('../models/tabelaCategoria')
// Função para buscar as categorias com filtros e paginação
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
      limit: limit === -1 ? undefined : parseInt(limit), // Se limit é -1, retorna todos os itens
      offset: limit === -1 ? 0 : (parseInt(page) - 1) * parseInt(limit), // Calcula o offset para paginação
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




const createCategoria = async ({ name, slug, use_in_menu}) => {
    try{

        const novaCategoria = await Categoria.create({
            name,
            slug,
            use_in_menu: use_in_menu || false,
        });
        return novaCategoria;
    }catch(error) {
        console.error('erro ao criar categoria:',error);
        throw error;
    }
};


module.exports ={
    createCategoria,
    getCategoria,
}