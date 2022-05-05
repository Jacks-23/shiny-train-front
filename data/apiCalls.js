const urlOrders = "https://localhost:7244/Orders";
const urlFindUser = "https://localhost:7244/Users/Login";

export async function GetAllOrdersWithProducts(token){
    let request = null;
    let ordersWithProducts = null;

    const headers = new Headers();
    headers.append('Content-Type', 'application/json, charset=utf-8');
    headers.append('Authorization', `Bearer ${token}`);

    const options = {
        method: "GEt",
        headers: headers
    };

    request = await fetch(urlOrders, options);

    ordersWithProducts = await request.json();

    return ordersWithProducts;
}

export async function FindUser(inputs) {
    let request = null;
    let foundUser = null;

    const options = {
        method: "POST",
        headers: {
            Accept:"*/*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(inputs)
    };

    request = await fetch(urlFindUser, options);

    foundUser = await request.json();

    return foundUser;

}