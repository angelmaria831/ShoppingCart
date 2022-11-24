
var products = [
    {
        "id":1,
        "name": 'Milk',
        "price":25,       
        "currency":"rupees",
        "category":"Diary",
        "remainingCount":15
    },
    {
        "id":2,
        "name": 'Carrot',
        "price":100,        
        "currency":"rupees",
        "category":"Vegtables",
        "remainingCount":0
    },
    {
        "id":3,
        "name": 'Apple',
        "price":120,
        "currency":"rupees",
        "category":"Fruits",
        "remainingCount":10
    },
    {
        "id":4,
        "name": 'Oats',
        "price":50,
        "currency":"rupees",
        "category":"Grain",
        "remainingCount":5
    },
    {
        "id":5,
        "name": 'Orange',
        "price":90,
        "currency":"rupees",
        "category":"Fruit",
        "remainingCount":8
    }

]
module.exports.listProducts = async()=>{

    return await new Promise((resolve,reject)=>{
        //Could use db query in real scenario
        let list = products.filter((item)=>{if(item.remainingCount>0)return item})
        resolve({"statusCode":200,"response":list})
    })
}