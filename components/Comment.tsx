'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import BoxStatus from "./BoxStatus"
import { Textarea } from "@/components/ui/textarea"
import useStatus from "@/hooks/useStatus"
export default function Comments(){
    const stateStatus=useStatus()
  return (
    <Card size="sm" className="mx-auto w-full max-w-sm my-5">
      <CardHeader>
        <CardTitle>Комментарий</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea placeholder="Комментарий к заказу." value={stateStatus.comment} onChange={(e)=>{stateStatus.setComment(e.target.value)}}/>
      </CardContent>
    </Card>
  )
}

