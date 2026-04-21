'use client'
import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"
import useStatus from "@/hooks/useStatus"
export default function BoxStatus(){
    const stateUseStatus=useStatus()
    const content_connected=(      
        <Badge className="bg-green-950 text-green-300">
            Касса подключена
        </Badge>
    )
    const content_disconnected=(
        <Badge className="bg-red-950 text-red-300">
            Касса не подключена
        </Badge>
    )
    const content_connect=(
        <Badge className="bg-blue-950 text-blue-300">
            <Spinner data-icon="inline-start" />
            Подключение к кассе
        </Badge>
    )
    let content
    switch(stateUseStatus.status){
        case 'connect':
            content=content_connect
            break
        case 'connected':
            content=content_connected
            break
        case 'disconnected':
            content=content_disconnected
            break
    }
    return(content)
}