const express = require('express');
const { getProductID, postProduct, putProduct, deleteProdutos,getProduct } = require('../services/serviceProduto')

const controllerGetProdutos = (req,res)=>{
    getProduct(req,res)
}

const controllerGetProdutosID = (req,res) => {
    getProductID(req, res)
}

const controllerPostProduct = (req,res) => {
    postProduct(req, res)
}

const controllerPutProduct = (req,res) => {
    putProduct(req,res)
}

const controllerDeleteProduct = (req,res) => {
    deleteProdutos(req,res)
}


module.exports = { 
    controllerGetProdutos,
    controllerGetProdutosID, 
    controllerPostProduct, 
    controllerPutProduct, 
    controllerDeleteProduct }