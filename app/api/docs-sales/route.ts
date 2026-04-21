export async function POST(req: Request) {
    const body = await req.json()
    const { searchParams } = new URL(req.url)
    const token = searchParams.get('token')
    const res = await fetch(`https://app.tablecrm.com/api/v1/docs_sales?token=${token}`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    })

    const data = await res.json()
    return Response.json(data)
}