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

export default function Cardd(){
    const stateStatus=useStatus()
  return (
    <>
    <Card size="sm" className="mx-auto w-full max-w-sm my-5">
      <CardHeader>
        <CardTitle>Корзина</CardTitle>
        <CardDescription className="uppercase">
          Количество, цена и сумма по позициям
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4 my-5">
            {stateStatus.card?.map((crd)=>(
                <Item variant="outline" className="my-2" key={crd.id}>
                <ItemContent>
                    <ItemTitle>{crd.name}</ItemTitle>
                            <p>{crd.price * crd.count} ₽</p>
                            <p>Количество: {crd.count}</p>
                </ItemContent>
                <ItemActions>
                    <Button variant="outline" size="sm" onClick={()=>{stateStatus.removeCard(crd.id)}}>
                        Удалить
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
