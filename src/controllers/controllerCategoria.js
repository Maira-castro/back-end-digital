const serviceCategoria = require('../services/serviceCategoria')

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
}