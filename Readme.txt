Overview

Basic APIs in nodeJS-mongodb could be used in a shopping cart. APIs are organised in REST and return JSON in all responses. Server would be running on localhost:3000 with mongodb Atlas deployed in cloud.

MongoDB - 2 collections
1) products - stores product details
    Sample : {
        "_id":{"$oid":"637faa7c695f82984b6d5524"},
        "pId":{"$numberInt":"3"},
        "currency":"rupees",
        "name":"Milk",
        "price":{"$numberInt":"25"},
        "remainingCount":{"$numberInt":"15"},
        "category":"Diary"
        },
        {
        "_id":{"$oid":"637fb1bcbf47f928e5182a7a"},
        "pId":{"$numberInt":"2"},
        "currency":"rupees",
        "name":"Carrot",
        "price":{"$numberInt":"100"},
        "category":"Vegetables",
        "remainingCount":{"$numberInt":"0"}
        }

2) userCart - stores user cart details
    Sample - {
        "_id":{"$oid":"637fb220695f82984b6d5527"},
        "userId":"John@gmail.com",
        "cart":[{"pId":{"$numberInt":"1"},
        "count":{"$numberInt":"4"}},
        {"pId":{"$numberInt":"3"},
        "count":{"$numberInt":"1"}}]
        },
        {
            "_id":{"$oid":"637fb297bf47f928e51857cf"},
            "userId":"Bob@gmail.com","cart":[]
        }

Authorization

Authorization for user is not added yet. Though userid in header is mandatory for all APIs.


API Reference

1) List available items

 URL: http://localhost:3000/api/v1/listProducts
 Type: GET
 Header: userid : John@gmail.com
 Response : [
  {
    "pId": 3,
    "currency": "rupees",
    "name": "Milk",
    "price": 25,
    "remainingCount": 15,
    "category": "Diary"
  },
  {
    "pId": 1,
    "currency": "rupees",
    "name": "Apple",
    "price": 120,
    "category": "Fruits",
    "remainingCount": 10
  },
  {
    "pId": 4,
    "currency": "rupees",
    "name": "Oats",
    "price": 50,
    "category": "Grain",
    "remainingCount": 5
  },
  {
    "pId": 5,
    "currency": "rupees",
    "name": "Orange",
    "price": 90,
    "category": "Fruit",
    "remainingCount": 8
  }
]

2) API to update cart(add/remove)

    A)URL: http://localhost:3000/api/v1/updateCart/add/3
        => operation - add/remove
        => pId - 3
    Type: PATCH
    Header: userid : John@gmail.com
    Response : Cart Updated Successfully

    B)URL: http://localhost:3000/api/v1/updateCart/remove/3
        => operation - add/remove
        => pId - 3
    Type: PATCH
    Header: userid : John@gmail.com
    Response : Cart Updated Successfully

3) API to list user specific cart items

    URL: http://localhost:3000/api/v1/getUserCartList
    Type: GET
    Header: userid : John@gmail.com
    Response : [
            {
                "_id": "637fb220695f82984b6d5527",
                "pId": 1,
                "name": "Apple",
                "category": "Fruits",
                "count": 4,
                "price": 120,
                "amtToPay": 480
            },
            {
                "_id": "637fb220695f82984b6d5527",
                "pId": 3,
                "name": "Milk",
                "category": "Diary",
                "count": 1,
                "price": 25,
                "amtToPay": 25
            }
            ]