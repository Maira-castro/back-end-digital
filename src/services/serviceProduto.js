const { Op } = require('sequelize');
const app = require("../app");
const tabelaProduto = require('../models/tabelaProduto');
const imagensProduto = require('../models/imagensProduto');
const opcoesProduto = require('../models/opcoesProduto');
const categoriaProduto = require('../models/categoriaProduto')
const sequelize = require('../config/conexao');
const { createCategoria } = require('./serviceCategoria');


//o limit ta funcionando
// const getProduct = async (req, res) => {
//     try {
//         // Extrair parâmetros da query
//         const { limit = 12, page = 1, fields, match, category_ids, price_range, option = {} } = req.query;

//         // Verificar se 'limit' é um número e se é maior que 0
//         const queryLimit = parseInt(limit);
//         if (isNaN(queryLimit) || queryLimit <= 0) {
//             return res.status(400).json({ message: 'limit aceita apenas números maiores que 0' });
//         }

//         // Configurar opções para consulta
//         let queryOptions = {
//             include: [
//                 {
//                     model: opcoesProduto,
//                     as: 'opcoesProduto'
//                 },
//                 {
//                     model: imagensProduto,
//                     as: 'imagensProduto',
//                     required: false
//                 }
//             ]
//         };

//         let where = {};

//         if (queryLimit === -1) {
//             queryOptions.limit = null;  // Se o valor for -1, significa sem limite
//         } else {
//             queryOptions.limit = queryLimit;
//         }

//         // Calcular o offset com base na página
//         const queryOffset = queryLimit ? (parseInt(page) - 1) * queryLimit : 0;

//         // Adicionar outros filtros como 'fields', 'category_ids', 'price_range', 'match', etc.
//         if (fields) {
//             queryOptions.attributes = fields.split(',');
//         }

//         if (category_ids) {
//             const categoryIdsArray = category_ids.split(',').map(id => parseInt(id));
//             where.category_ids = { [Op.in]: categoryIdsArray };
//         }

//         if (price_range) {
//             const [minPrice, maxPrice] = price_range.split('-').map(price => parseFloat(price));
//             if (!isNaN(minPrice) && !isNaN(maxPrice)) {
//                 where.price = { [Op.between]: [minPrice, maxPrice] };
//             }
//         }

//         if (match) {
//             where[Op.or] = [
//                 { name: { [Op.like]: `%${match}%` } },
//                 { description: { [Op.like]: `%${match}%` } },
//             ];
//         }

//         if (Object.keys(option).length > 0) {
//             const optionFilters = [];
//             for (const [key, value] of Object.entries(option)) {
//                 const valuesArray = value.split(',');
//                 optionFilters.push({
//                     [`options.${key}`]: { [Op.in]: valuesArray }
//                 });
//             }
//             where[Op.and] = optionFilters;
//         }

//         queryOptions.where = where;
//         queryOptions.offset = queryOffset;

//         // Executar a consulta
//         const produtos = await tabelaProduto.findAll(queryOptions);

//         if (produtos.length === 0) {
//             return res.status(404).json({ message: 'Nenhum produto encontrado!' });
//         }

//         // Formatar a resposta
//         const formattedResponse = {
//             data: produtos.map(produto => ({
//                 id: produto.id,
//                 enabled: produto.enabled,
//                 name: produto.name,
//                 slug: produto.slug,
//                 stock: produto.stock,
//                 description: produto.description,
//                 price: produto.price,
//                 price_with_discount: produto.price_with_discount,
//                 category_ids: produto.category_ids,
//                 images: produto.imagensProduto.map(image => ({
//                     id: image.id,
//                     content: image.path
//                 })),
//                 options: produto.opcoesProduto.map(option => ({
//                     id: option.id,
//                     title: option.title,
//                     shape: option.shape,
//                     radius: option.radius,
//                     type: option.type,
//                     values: option.values
//                 }))
//             })),
//             total: produtos.length,
//             limit: queryLimit,
//             page: parseInt(page)
//         };

//         return res.status(200).json(formattedResponse);
//     } catch (error) {
//         console.error('Erro ao procurar produtos:', error);
//         return res.status(500).json({ message: 'Erro ao procurar produtos' });
//     }
// };

const getProduct = async (req, res) => {
    try {
        // Extrair parâmetros da query
        const { limit = 12, page = 1, fields, match, categorias_id, price_range, option = {} } = req.query;

        // Verificar se 'limit' é um número e se é maior que 0
        const queryLimit = parseInt(limit);
        if (isNaN(queryLimit) || queryLimit <= 0) {
            return res.status(400).json({ message: 'limit aceita apenas números maiores que 0' });
        }
         // Definir categorias_idArray de forma segura
    let categorias_idArray = [];
    if (categorias_id) {
      if (typeof categorias_id === 'string') {
        // Caso categorias_id seja uma string, transformamos em array
        categorias_idArray = categorias_id.split(',').map(id => parseInt(id, 10));
      } else if (Array.isArray(categorias_id)) {
        // Caso categorias_id já seja um array
        categorias_idArray = categorias_id.map(id => parseInt(id, 10));
      }
    }

        // Configurar opções para consulta
        let queryOptions = {
            include: [
                {
                    model: opcoesProduto,
                    as: 'opcoesProduto'
                },
                {
                    model: imagensProduto,
                    as: 'imagensProduto',
                    required: false
                },
                {
                    model: categoriaProduto,
                    as: 'categoriaProduto',
                    required: true, // Garantir que a categoria seja obrigatória para o produto
                    where: {
                      categoria_id: { [Op.in]: categorias_idArray } // Filtrando pelas categorias
                    },
                    attributes: ['categoria_id']  // Garantir que estamos pegando apenas o ID da categoria
                  }

                
            ]
        };

        let where = {};

        if (queryLimit === -1) {
            queryOptions.limit = null;  // Se o valor for -1, significa sem limite
        } else {
            queryOptions.limit = queryLimit;
        }

        // Calcular o offset com base na página
        const queryOffset = queryLimit ? (parseInt(page) - 1) * queryLimit : 0;

        // Adicionar outros filtros como 'fields', 'category_ids', 'price_range', 'match', etc.
        if (fields) {
            queryOptions.attributes = fields.split(',');
        }
        // Garantir que a variável de categorias_id seja definida corretamente
    // if (categorias_id) {
    //     let categorias_idArray = [];
    //     if (typeof categorias_id === 'string') {
    //       categorias_idArray = categorias_id.split(',').map(id => parseInt(id));
    //     } else if (Array.isArray(categorias_id)) {
    //       categorias_idArray = categorias_id.map(id => parseInt(id));
    //     }
  
    //     if (categorias_idArray.length > 0) {
    //       queryOptions.include[2].where.categoria_id = {
    //         [Op.in]: categorias_idArray // Aplicar filtro correto na categoria
    //       };
    //     } else {
    //       return res.status(400).json({ message: 'Categorias não válidas.' });
    //     }
    //   }
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
              // Verifique se existe 'categoriaProduto' antes de mapear
              categorias_id: produto.categoriaProduto.map(categoria => categoria.categoria_id), // Aqui extraímos as categorias // Se não houver categorias, retorna um array vazio
              // Verifique se existe 'imagensProduto' antes de mapear
              images: produto.imagensProduto ? produto.imagensProduto.map(image => ({ id: image.id, content: image.path })) : [],
              // Verifique se existe 'opcoesProduto' antes de mapear
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
            return res.status(500).json({ res,message:'Nenhum produto encontrado!'});
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
            category_ids: produto.category_ids,
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

        return res.status(200).json( res,formattedResponse);

    } catch (error) {
        return res.status(500).json({ res,message:'Nenhum produto encontrado!'});
    }
}
//esta funcionando para criar o produto
// const postProduct = async (req, res) => {
//     const { enabled, name, slug, use_in_menu, stock, description, price, price_with_discount, category_ids, images, options } = req.body;
//     const obrigatorios = { name, slug, price, price_with_discount };

//     // Verifica campos obrigatórios
//     const camposFaltando = Object.keys(obrigatorios).filter(key => !obrigatorios[key]);
//     if (camposFaltando.length > 0) {
//         return res.status(500).json({ message: 'Campos obrigatórios não preenchidos' });
//     }
//     // Começando uma transação
//     const t = await sequelize.transaction();

//     try {
//         // Cria o produto principal
//         const createProduto = await tabelaProduto.create({
//             enabled,
//             name,
//             slug,
//             use_in_menu,
//             stock,
//             description,
//             price,
//             price_with_discount,
//             category_ids: JSON.stringify(category_ids)
//         } ,{ transaction: t } );
        
//         console.log('Produto criado com sucesso:', createProduto);

//         // Cria as imagens relacionadas
//         if (images && images.length > 0) {
//             const imagensData = images.map(image => ({
//                 product_id: createProduto.id,
//                 path: image.content,
//                 enabled: true
//             }));
//             await imagensProduto.bulkCreate(imagensData,{ transaction: t });
//             console.log('Imagens criadas com sucesso:', imagensData);
//         }

//         // Cria as opções relacionadas
//         if (options && options.length > 0) {
//             const opcoesData = options.map(option => ({
//                 produtos_id: createProduto.id,
//                 title: option.title,
//                 shape: option.shape,
//                 radius: option.radius ? parseFloat(option.radius) : null,
//                 type: option.type,
//                 values: JSON.stringify(option.values || [])
//             }));
//             await opcoesProduto.bulkCreate(opcoesData, { transaction: t });
//             console.log('Opções criadas com sucesso:', opcoesData);
//         }
//          // Commit da transação
//          await t.commit();

//         // return res.status(200).json({ res,message:'produto criado com sucesso'});
//         return res.status(200).json({ message: 'Produto criado com sucesso' });;

//     // } catch (error) {
//     //     console.error('Erro ao criar produto:', error);
//     //     return res.status(500).json({ res,message:'erro ao criar produto'});
//     // }
//     // }catch (error) {
//     //     // Limpeza do erro: Remover referências circulares
//     //     if (error instanceof Error) {
//     //         // Se for um erro padrão, remova as propriedades circulares
//     //         error = { message: error.message, stack: error.stack };
//     //     }

//     //     // Garantir que o erro seja simplificado antes de enviar na resposta
//     //     console.error('Erro ao criar produto:', error);
//     //     return res.status(500).json({ message: 'Erro ao criar produto', error: error.message });
//     // }
//     }catch (error) {
//         // Rollback da transação em caso de erro
//         await t.rollback();
//         console.error('Erro ao criar produto:', error);
//         return res.status(500).json({ message: 'Erro ao criar produto', error: error.message });
//     }
// };

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

    // } catch (error) {
    //     console.error('Erro ao criar produto:', error);
    //     return res.status(500).json({ res,message:'erro ao criar produto'});
    // }
    // }catch (error) {
    //     // Limpeza do erro: Remover referências circulares
    //     if (error instanceof Error) {
    //         // Se for um erro padrão, remova as propriedades circulares
    //         error = { message: error.message, stack: error.stack };
    //     }

    //     // Garantir que o erro seja simplificado antes de enviar na resposta
    //     console.error('Erro ao criar produto:', error);
    //     return res.status(500).json({ message: 'Erro ao criar produto', error: error.message });
    // }
    }catch (error) {
        // Rollback da transação em caso de erro
        await t.rollback();
        console.error('Erro ao criar produto:', error);
        return res.status(500).json({ message: 'Erro ao criar produto', error: error.message });
    }
};

const putProduct = async (req, res) => {
    const id = req.params.id;
    const { enabled, name, slug, use_in_menu, stock, description, price, price_with_discount, category_ids, images, options } = req.body;

    // Verifica se pelo menos um campo foi preenchido
    if (!enabled && !name && !slug && !use_in_menu && !stock && !description && !price && !price_with_discount && !category_ids && !images && !options) {
        return res.status(500).json({ res,message:'necessario atualizar um intme'});
    }

    try {
        const usuario = await tabelaProduto.findByPk(id)
        if(!usuario) return res.status(500).json({ res,message:'produto nao encontrado'});


        await tabelaProduto.update(
            {
                enabled,
                name,
                slug,
                use_in_menu,
                stock,
                description,
                price,
                price_with_discount
            },
            { where: { id: id } }
        );

        if (images && images.length > 0) {
            await Promise.all(images.map(async (img) => {
                if (img.id) {
                    await imagensProduto.update(
                        {
                            enabled: img.deleted,
                            path: img.content
                        },
                        { where: { id: img.id } }
                    );
                } else {
                    console.log('ID da imagem não fornecido:', img);
                }
            }));
        }

        if (options && options.length > 0) {
            await Promise.all(options.map(async (opt) => {
                if (opt.id) {
                    const radius = isNaN(opt.radius) ? 0 : opt.radius;
                    await opcoesProduto.update(
                        {
                            title: opt.title,
                            shape: opt.shape,
                            radius: radius,
                            type: opt.type,
                            values: opt.values
                        },
                        { where: { id: opt.id } }
                    );
                } else {
                    console.log('ID da opção não fornecido:', opt);
                }
            }));
        }

        return res.status(200).json({ res,message:'produto atualizado com sucesso'});
    } catch (error) {
        
        return res.status(500).json({ res,message:'erro'});
    }
};

const deleteProdutos = async (req, res) => {
    const id = req.params.id;

    if (!id) {
       
        return res.status(500).json({ res,message:'id nao fornecido'});
    }

    try {
        // Código de exclusão
        await opcoesProduto.destroy({ where: { produtos_id: id } });
        await imagensProduto.destroy({ where: { product_id: id } });

        // Finalmente, exclua o produto
        const produto = await tabelaProduto.destroy({ where: { id: id } });

        if (!produto) {
          
            return res.status(500).json({ res,message:`Produto com o id=${id} não foi encontrado.`});
        }
        return res.status(500).json( res);
       
    } catch (error) {
        
        return res.status(500).json({ res,message:'erro na remoçao'});
    }
};

module.exports = {
    getProduct,
    getProductID,
    postProduct,
    putProduct,
    deleteProdutos
};