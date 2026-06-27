'use server'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
export const creatTicket = async(newTicketData)=>{
    const res = await fetch(`${baseUrl}/api/tickets`,{
        method: 'POST',
        headers: {
            'content-type' : 'application/json'
        },
        body: JSON.stringify(newTicketData)
    })
    return res.json()
}