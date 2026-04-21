export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const token = searchParams.get('token')
    const number=searchParams.get('number')
    
    const res = await fetch(`https://app.tablecrm.com/api/v1/contragents?token=${token}&phone=${number}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }})
    const client = await res.json()
    return Response.json(client)
}