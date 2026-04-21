export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const token = searchParams.get('token')
    const product=searchParams.get('product')
    
    const res = await fetch(`https://app.tablecrm.com/api/v1/nomenclature?token=${token}&name=${product}&with_prices=true`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }})
    const client = await res.json()
    return Response.json(client)
}