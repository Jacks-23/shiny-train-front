const urlOrders = "https://localhost:7244/Orders";
const urlFindUser = "https://localhost:7024/Users/FindUser";

export async function GetAllOrdersWithProducts(){
    let request = null;
    let ordersWithProducts = null;

    request = await fetch(urlOrders);

    ordersWithProducts = await request.json();

    return ordersWithProducts;
}

export async function FindUser(user) {
    console.log(user);
    let request = null;
    let foundUser = null;

    const options = {
        method: "POST",
        headers: {
            Accept:"*/*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    };
    console.log(options.body);

    request = await fetch(urlFindUser, options);

    foundUser = await request.json();

    return foundUser;

}