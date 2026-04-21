'use client'
import { RussianRuble } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { Input } from "./ui/input"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import useStatus from "@/hooks/useStatus"
import { useState,useEffect } from "react"


export default function Product(){
    const stateStatus=useStatus()
    const [searchProduct,setSearchProduct]=useState('')
    const [products,setProducts]=useState<any[]>([])
    const handlerSearch=async()=>{
    const res = await fetch(`/api/products?token=${stateStatus.token}&product=${searchProduct}`,
        {
            method: 'GET',
        })
        const data=await res.json()
        setProducts(data?.result ?? [])
    }
    useEffect(()=>{
        handlerSearch()
    },[searchProduct])
    useEffect(()=>{
        if(stateStatus.status=='connected') handlerSearch()
    },[stateStatus.status])
    const handlerAddCard=(prd:any)=>{
        const price = prd.prices?.[0]?.price ?? 0
        stateStatus.setCard({
            id: prd.id,
            name: prd.name,
            price: price,
            count: 1,
        })
    }
  return (
    <>
    <Card size="sm" className="mx-auto w-full max-w-sm my-5">
      <CardHeader>
        <CardTitle>4. Товары</CardTitle>
        <CardDescription className="uppercase">
          Поиск и добавление номенклатуры
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Input placeholder="Поиск товара по названию" onChange={(e)=>{setSearchProduct(e.target.value)}} disabled={!(stateStatus.status==='connected')}/>
        <ScrollArea className="h-[400px] w-[350px] rounded-md border p-4 my-5">
            {products?.map((prd:any)=>(
                <Item variant="outline" className="my-2" key={prd.id}>
                <ItemContent>
                    <ItemTitle>{prd.name}</ItemTitle>
                        {prd.prices?.[0]?.price ? (
                        <div className="flex">
                            {prd.prices[0].price} ₽
                        </div>
                        ) : (
                        'Цена не указана'
                        )}
                </ItemContent>
                <ItemActions>
                    <Button variant="outline" size="sm" onClick={()=>{handlerAddCard(prd)}}>
                        Добавить
                    </Button>
                </ItemActions>
            </Item>
            ))}

        </ScrollArea>
      </CardContent>
    </Card>
    </>
  )
}
