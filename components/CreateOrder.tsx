'use client'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import useStatus from "@/hooks/useStatus"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function CreateOrder(){
    const stateStatus=useStatus()
    const total = stateStatus.card.reduce((sum, item) => {
    return sum + item.price * item.count
    }, 0)
    const sendOrder=async()=>{
        if(!stateStatus.organization){
            toast.warning("Необходимо выбрать Организацию",{ position:"top-center"})
            return
        }
        if(!stateStatus.warehouse){
            toast.warning("Необходимо выбрать Склад",{ position:"top-center"})
            return
        }
        if(!stateStatus.paybox){
            toast.warning("Необходимо выбрать Счет",{ position:"top-center"})
            return
        }
        if(stateStatus.card.length===0){
            toast.warning("Необходимо добавить Товар",{ position:"top-center"})
            return
        }
        if(!stateStatus.price_type){
            toast.warning("Необходимо добавить Тип цены",{ position:"top-center"})
            return
        }
        let dataSend={
            organization:Number(stateStatus.organization),
            operation:"Заказ",
            contragent:Number(stateStatus.contragent)||0,
            comment:stateStatus.comment,
            warehouse:Number(stateStatus.warehouse),
            paybox:Number(stateStatus.paybox),
            goods: stateStatus.card.map((item) => ({
                nomenclature: Number(item.id),
                nomenclature_name: item.name,
                quantity: Number(item.count),
                price: Number(item.price),
                price_type: Number(stateStatus.price_type),
            })),
        }
        
        const res = await fetch(`/api/docs-sales?token=${stateStatus.token}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataSend)
        })
        if(res.status === 200){
            stateStatus.clearCard()
            toast.success("Заказ успешно оформлен",{ position:"top-center"})
        }else{
            toast.warning("Ошибка, попробуйте позднее",{ position:"top-center"})
        }
    }
  return (
    <Card size="sm" className="mx-auto w-full max-w-sm my-5">
      <CardHeader>
        <CardTitle>Оформление заказа</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="w-full flex justify-between">
            <p>Итого:</p>
            <p>{total} ₽</p>
        </div>
        <Button className="w-full" onClick={sendOrder} disabled={stateStatus.card.length==0}>
            Создать продажу
        </Button>
        <Button className="w-full" variant="outline" onClick={sendOrder} disabled={stateStatus.card.length==0}>
            Создать и провести
        </Button>
      </CardContent>
    </Card>
  )
}
