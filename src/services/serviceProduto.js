const { Op } = require('sequelize'); 
const tabelaProduto = require('../models/tabelaProduto'); 
const imagensProduto = require('../models/imagensProduto');
const opcoesProduto = require('../models/opcoesProduto');
const categoriaProduto = require('../models/categoriaProduto')
const sequelize = require('../config/conexao');

const getProduct = async (req, res) => {
    try {
        // Extrair parâmetros da query
        const { limit = 12, page = 1, fields, match, categorias_id, price_range, option = {} } = req.query;

        // Verificar se 'limit' é um número e se é maior que 0
        const queryLimit = parseInt(limit);
        if (isNaN(queryLimit) || queryLimit <= 0) {
            return res.status(400).json({ message: 'limit aceita apenas números maiores que 0' });
        }

        // Configurar opções para consulta
        let queryOptions = {
            include: [
                {
                    model: categoriaProduto,
                    as: 'categoriaProduto',
                    attributes: ['categoria_id'] // Trazer somente o 'categoria_id'
                },
                {
                    model: imagensProduto,  // Inclui a associação com a tabela de imagens
                    as: 'imagensProduto',
                    attributes: ['id', 'path'], // Atributos de imagens que você quer
                    required: false  // Garante que o produto será retornado mesmo sem imagens
                },
                {
                    model: opcoesProduto,  // Inclui a associação com as opções
                    as: 'opcoesProduto',
                    attributes: ['id', 'title', 'shape', 'radius', 'type', 'values'], // Atributos das opções
                    required: false  // Garante que o produto será retornado mesmo sem opções
                }
            ]
        };

        // Condicional para incluir as associações com imagens e opções
        if (fields) {
            // Limita os campos principais conforme o filtro 'fields'
            queryOptions.attributes = fields.split(',').filter(field => field !== 'images'); // Remove 'images' da seleção, caso seja passado
        }

        let where = {};

        if (queryLimit === -1) {
            queryOptions.limit = null;  // Se o valor for -1, significa sem limite
        } else {
            queryOptions.limit = queryLimit;
        }

        // Ajuste para o filtro de categorias_id
        if (categorias_id) {
            let categorias_idArray = [];
        
            // Verifica se categorias_id é uma string ou um array
            if (typeof categorias_id === 'string') {
                categorias_idArray = categorias_id.split(',').map(id => parseInt(id.trim())); // Converte os ids para números
            } else if (Array.isArray(categorias_id)) {
                categorias_idArray = categorias_id.map(id => parseInt(id)); // Converte os ids para números
            }
        
            // Filtro para garantir que o produto pertence a uma das categorias
            queryOptions.include[0].where = {
                categoria_id: {
                    [Op.in]: categorias_idArray // Filtra para garantir que a categoria_id corresponde aos valores fornecidos
                }
            };
        }

        // Calcular o offset com base na página
        const queryOffset = queryLimit ? (parseInt(page) - 1) * queryLimit : 0;

        // Adicionar outros filtros como 'price_range', 'match', etc.
        if (price_range) {
            const [minPrice, maxPrice] = price_range.split('-').map(price => parseFloat(price));
            if (!isNaN(minPrice) && !isNaN(maxPrice)) {
                where.price = { [Op.between]: [minPrice, maxPrice] };
            }
        }

        if (match) {
            where[Op.or] = [
                { name: { [Op.like]: `%${match}%` } },
                { description: { [Op.like]: `%${match}%` } },
            ];
        }

        if (Object.keys(option).length > 0) {
            const optionFilters = [];
            for (const [key, value] of Object.entries(option)) {
                const valuesArray = value.split(',');
                optionFilters.push({
                    [`options.${key}`]: { [Op.in]: valuesArray }
                });
            }
            where[Op.and] = optionFilters;
        }

        queryOptions.where = where;
        queryOptions.offset = queryOffset;

        // Executar a consulta
        const produtos = await tabelaProduto.findAll(queryOptions);

        if (produtos.length === 0) {
            return res.status(404).json({ message: 'Nenhum produto encontrado!' });
        }

        // Formatar a resposta
        const formattedResponse = {
            data: produtos.map(produto => ({
                id: produto.id,
                enabled: produto.enabled,
                name: produto.name,
                slug: produto.slug,
                stock: produto.stock,
                description: produto.description,
                price: produto.price,
                price_with_discount: produto.price_with_discount,
                categorias_id: produto.categoriaProduto ? produto.categoriaProduto.map(categoria => categoria.categoria_id) : [],
                // Verifique se existe 'imagensProduto' antes de mapear
                images: produto.imagensProduto ? produto.imagensProduto.map(image => ({ id: image.id, content: image.path })) : [],
                options: produto.opcoesProduto ? produto.opcoesProduto.map(option => ({
                    id: option.id,
                    title: option.title,
                    shape: option.shape,
                    radius: option.radius,
                    type: option.type,
                    values: option.values || []
                })) : []
            })),
            total: produtos.length,
            limit: queryLimit,
            page: parseInt(page)
        };

        return res.status(200).json(formattedResponse);
    } catch (error) {
        console.error('Erro ao procurar produtos:', error);
        return res.status(500).json({ message: 'Erro ao procurar produtos' });
    }
};


const getProductID = async (req, res) => {
    try {
        const { id } = req.params;

        const queryOptions = {
            include: [
                {
                    model: categoriaProduto,
                    as: 'categoriaProduto',
                    attributes: ['categoria_id'] // Trazer somente o 'categoria_id'
                },
                {
                    model: opcoesProduto,
                    as: 'opcoesProduto'
                },
                {
                    model: imagensProduto,
                    as: 'imagensProduto',
                    required: false
                }
            ]
        };

        // Executando a consulta
        const produto = await tabelaProduto.findByPk(id, queryOptions);

        if (!produto) {
            return res.status(404).json({ message: 'Nenhum produto encontrado!' });
        }

        // Formatando a resposta
        const formattedResponse = {
            id: produto.id,
            enabled: produto.enabled,
            name: produto.name,
            slug: produto.slug,
            stock: produto.stock,
            description: produto.description,
            price: produto.price,
            price_with_discount: produto.price_with_discount,
            categorias_id: produto.categoriaProduto ? produto.categoriaProduto.map(categoria => categoria.categoria_id) : [],
            images: produto.imagensProduto.map(image => ({
                id: image.id,
                content: image.path
            })),
            options: produto.opcoesProduto.map(option => ({
                id: option.id,
                title: option.title,
                shape: option.shape,
                radius: option.radius,
                type: option.type,
                values: option.values
            }))
        };

        // Enviar a resposta com o objeto formatado
        return res.status(200).json(formattedResponse);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao procurar produto!' });
    }
};


//crio o produto e os relacionamentos funcionam
const postProduct = async (req, res) => {
    const { enabled, name, slug, use_in_menu, stock, description, price, price_with_discount, categorias_id, images, options } = req.body;
    const obrigatorios = { name, slug, price, price_with_discount };

    // Verifica campos obrigatórios
    const camposFaltando = Object.keys(obrigatorios).filter(key => !obrigatorios[key]);
    if (camposFaltando.length > 0) {
        return res.status(500).json({ message: 'Campos obrigatórios não preenchidos' });
    }
    // Começando uma transação
    const t = await sequelize.transaction();

    try {
        // Cria o produto principal
        const createProduto = await tabelaProduto.create({
            enabled,
            name,
            slug,
            use_in_menu,
            stock,
            description,
            price,
            price_with_discount,
            categorias_id: JSON.stringify(categorias_id)
            // categorias_id: categorias_id
        } ,{ transaction: t } );
        
        console.log('Produto criado com sucesso:', createProduto);

           // Cria os produtos/categoria relacionados - testar 
        // Agora, associamos as categorias à tabela produto_categoria
        if (categorias_id && categorias_id.length > 0) {
            const categorias_idData = categorias_id.map(categoria => ({
                produtos_id: createProduto.id, // O ID do produto recém-criado
                categoria_id: categoria // O ID da categoria associada ao produto
            }));
            await categoriaProduto.bulkCreate(categorias_idData, { transaction: t });
            console.log('Categorias associadas com sucesso:', categorias_idData);
        }
        // Cria as imagens relacionadas
        if (images && images.length > 0) {
            const imagensData = images.map(image => ({
                product_id: createProduto.id,
                path: image.content,
                enabled: true
            }));
            await imagensProduto.bulkCreate(imagensData,{ transaction: t });
            console.log('Imagens criadas com sucesso:', imagensData);
        }

        // Cria as opções relacionadas
        if (options && options.length > 0) {
            const opcoesData = options.map(option => ({
                produtos_id: createProduto.id,
                title: option.title,
                shape: option.shape,
                radius: option.radius ? parseFloat(option.radius) : null,
                type: option.type,
                values: JSON.stringify(option.values || [])
            }));
            await opcoesProduto.bulkCreate(opcoesData, { transaction: t });
            console.log('Opções criadas com sucesso:', opcoesData);
        }
         // Commit da transação
         await t.commit();

        // return res.status(200).json({ res,message:'produto criado com sucesso'});
        return res.status(200).json({ message: 'Produto criado com sucesso' });
    }catch (error) {
        // Rollback da transação em caso de erro
        await t.rollback();
        console.error('Erro ao criar produto:', error);
        return res.status(500).json({ message: 'Erro ao criar produto', error: error.message });
    }
};

const putProduct = async (req, res) => {
    const id = req.params.id;
    const { enabled, name, slug, use_in_menu, stock, description, price, price_with_discount, categorias_id, images, options } = req.body;

    // Verifica se pelo menos um campo foi preenchido para atualização
    if (!enabled && !name && !slug && !use_in_menu && !stock && !description && !price && !price_with_discount && !categorias_id && !images && !options) {
        return res.status(400).json({ message: 'É necessário atualizar ao menos um item' });
    }

    // Iniciando uma transação
    const t = await sequelize.transaction();

    try {
        // Verifica se o produto existe
        const produto = await tabelaProduto.findByPk(id);
        if (!produto) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }

        // Verifica se algum dado foi alterado
        let produtoAtualizado = false;
        const camposParaAtualizar = {};

        // Comparar cada campo e verificar se houve mudança
        if (enabled !== undefined && enabled !== produto.enabled) {
            camposParaAtualizar.enabled = enabled;
            produtoAtualizado = true;
        }
        if (name && name !== produto.name) {
            camposParaAtualizar.name = name;
            produtoAtualizado = true;
        }
        if (slug && slug !== produto.slug) {
            camposParaAtualizar.slug = slug;
            produtoAtualizado = true;
        }
        if (use_in_menu !== undefined && use_in_menu !== produto.use_in_menu) {
            camposParaAtualizar.use_in_menu = use_in_menu;
            produtoAtualizado = true;
        }
        if (stock !== undefined && stock !== produto.stock) {
            camposParaAtualizar.stock = stock;
            produtoAtualizado = true;
        }
        if (description && description !== produto.description) {
            camposParaAtualizar.description = description;
            produtoAtualizado = true;
        }
        if (price !== undefined && price !== produto.price) {
            camposParaAtualizar.price = price;
            produtoAtualizado = true;
        }
        if (price_with_discount !== undefined && price_with_discount !== produto.price_with_discount) {
            camposParaAtualizar.price_with_discount = price_with_discount;
            produtoAtualizado = true;
        }

        // Se algum campo foi alterado, atualiza o produto
        if (produtoAtualizado) {
            await tabelaProduto.update(camposParaAtualizar, {
                where: { id },
                transaction: t
            });
            console.log('Produto atualizado com sucesso');
        } else {
            console.log('Nenhuma alteração encontrada no produto');
            return res.status(200).json({ message: 'Nenhuma alteração encontrada no produto' });
        }

        // Atualizar categorias
        if (categorias_id && categorias_id.length > 0) {
            // Primeiro, deleta as categorias antigas associadas ao produto
            await categoriaProduto.destroy({ where: { produtos_id: id }, transaction: t });

            // Agora, insere as novas categorias
            const categoriasData = categorias_id.map(categoria => ({
                produtos_id: id,
                categoria_id: categoria
            }));
            await categoriaProduto.bulkCreate(categoriasData, { transaction: t });
            console.log('Categorias associadas com sucesso');
        }

        
        if (images && images.length > 0) {
            await Promise.all(images.map(async (img) => {
                if (img.id) {
                    
                    await imagensProduto.update(
                        { enabled: img.deleted, path: img.content },
                        { where: { id: img.id }, transaction: t }
                    );
                } else {
                    console.log('ID da imagem não fornecido, nenhuma nova imagem será criada');
                }
            }));
        }

        
        if (options && options.length > 0) {
            await Promise.all(options.map(async (opt) => {
                if (opt.id) {
                    
                    const radius = isNaN(opt.radius) ? 0 : opt.radius;
                    await opcoesProduto.update(
                        { title: opt.title, shape: opt.shape, radius, type: opt.type, values: JSON.stringify(opt.values || []) },
                        { where: { id: opt.id }, transaction: t }
                    );
                } else {
                    console.log('ID da opção não fornecido, nenhuma nova opção será criada');
                }
            }));
        }

        // Commit da transação
        await t.commit();

        return res.status(200).json({ message: 'Produto atualizado com sucesso' });

    } catch (error) {
        // Rollback da transação em caso de erro
        await t.rollback();
        console.error('Erro ao atualizar produto:', error);
        return res.status(500).json({ message: 'Erro ao atualizar produto', error: error.message });
    }
};






const deleteProdutos = async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({ message: 'ID não fornecido' });
    }

    try {
        // Exclui as associações do produto em outras tabelas (relacionamentos)
        await categoriaProduto.destroy({ where: { produtos_id: id } });
        await opcoesProduto.destroy({ where: { produtos_id: id } });
        await imagensProduto.destroy({ where: { product_id: id } });

        // Exclui o produto principal
        const produtoDeletado = await tabelaProduto.destroy({ where: { id: id } });

        if (produtoDeletado === 0) {
            // Se nenhum produto foi deletado, isso significa que o produto não foi encontrado
            return res.status(404).json({ message: `Produto com o id=${id} não foi encontrado.` });
        }

        // Produto e suas associações foram deletados com sucesso
        return res.status(200).json({ message: 'Produto e suas associações deletados com sucesso.' });

    } catch (error) {
        console.error('Erro ao excluir o produto:', error);
        return res.status(500).json({ message: 'Erro ao remover o produto e suas associações.', error: error.message });
    }
};


module.exports = {
    getProduct,
    getProductID,
    postProduct,
    putProduct,
    deleteProdutos
};