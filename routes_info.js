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


}*/
//----------------produto--------------------
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

//rota:
//metodo:
//url:
/*json/no body:

*/

//rota:PESQUISAR PRODUTO
//metodo:get
//url:http://localhost:3000/v1/produtos/search?limit=3
/*no body
*/