export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const token = searchParams.get('token')
    const res_organizations = await fetch(`https://app.tablecrm.com/api/v1/organizations?token=${token}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }})
        if(!res_organizations.ok){
            return Response.json({error:'Вы ввели некорректный токен!'})
        }
    const organizations = await res_organizations.json()

    const res_payboxes = await fetch(`https://app.tablecrm.com/api/v1/payboxes/?token=${token}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }})
    const payboxes = await res_payboxes.json()
    

    const res_warehouses = await fetch(`https://app.tablecrm.com/api/v1/warehouses/?token=${token}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }})
    const warehouses = await res_warehouses.json()


    const res_price_types = await fetch(`https://app.tablecrm.com/api/v1/price_types/?token=${token}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }})
    const price_types = await res_price_types.json()

    const all_data={
        organizations:organizations,
        payboxes:payboxes,
        warehouses:warehouses,
        price_types:price_types
    }
    return Response.json(all_data)
}