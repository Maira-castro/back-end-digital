//para usar o token 
// Authorization <seu_token/>


//----------------usuario--------------------
//rota: LOGIN/TOKEN
//metodo: POST
//URL: http://localhost:3000/v1/user/token
/* ex.JSON:{
  "email": "johndoe@example.com",
  "password": "senha123"
}*/

//rota: CADASTRAR USUARIO
//metodo: POST
//URL:http://localhost:3000/v1/usuario
/*ex. JSON:{
  "firstname": "liz",
  "surname": "Doe",
  "email": "liz@example.com",
  "password": "senha123",
	"confirmPassword":"senha123"
}*/

//----------------categoria--------------------
//rota: CADASTRAR CATEGORIA
//metodo:POST 
//URL:http://localhost:3000/v1/categoria
/* ex.JSON:{  "name":"peixe",
            "slug":"peixe",
            "use_in_menu": true
}
//rota: PESQUISAR CATEGORIA
//metodo:GET 
//URL:http://localhost:3000/v1/categoria/search?limit=2&page=1&fields=name,slug&use_in_menu=true
/*SEUS PARAMETROS.

//rota: PESQUISAR CATEGORIA POR ID
//metodo:GET 
//URL:http://localhost:3000/v1/categoria/1
}*/

//rota: ATUALIZAR CATEGORIA
//metodo:PUT 
//URL:http://localhost:3000/v1/categoria/1
/* ex.JSON:(as informações que deseja atualizar)

//rota: DELETAR CATEGORIA POR ID
//metodo:DELETE 
//URL:http://localhost:3000/v1/categoria/1
}*/


//----------------PRODUTO--------------------
//rota:CADASTRAR PRODUTO
//metodo: POST
//URL: http://localhost:3000/v1/produtos
/* ex.JSON:{
  "enabled": true,
  "name": "telefone",
  "slug": "solitude",
  "use_in_menu": true,
  "stock": 100,
  "description": "sex",
  "price": 20,
  "price_with_discount": 12,
  "category_ids": [2],
  "images": [
    {
      "content": "/path/to/image2.jpg"
    }
  ],
  "options": [
    {
      "title": "Tamanho",
      "shape": "circle",
      "radius": 10,
      "type": "color",
      "values": ["P", "M", "G"]
    }
  ]
}*/

//rota:PESQUISAR PRODUTO PELO ID
//metodo:GET
//url:http://localhost:3000/v1/produtos/1
/*no body:
*/

//rota:PESQUISAR PRODUTO
//metodo:GET
//url:http://localhost:3000/v1/produtos/search?limit=3
/*no body
*/
//rota:ATUALIZAR PRODUTO
//metodo:PUT
//url:http://localhost:3000/v1/produtos/16
/*JSON:(as informações que deseja atualizar)
*/
//rota:DELETAR PRODUTO
//metodo:DELETE
//url:http://localhost:3000/v1/produtos/16
/*no body:
*/