const Categoria = require('../models/tabelaCategoria')

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
}