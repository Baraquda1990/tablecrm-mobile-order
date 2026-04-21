'use client'
import { SearchIcon } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import useStatus from "@/hooks/useStatus"
import { useState } from "react"

export default function Client(){
    const stateStatus=useStatus()
    const [number,setNumber]=useState('')
    const [clients, setClients] = useState<any[]>([])
    const handlerSearch=async()=>{
    if(number.length==0){
        toast.warning("Введите номер телефона",{ position:"top-center"})
        return
    }
    const res = await fetch(`/api/contragents?token=${stateStatus.token}&number=${number}`,
        {
            method: 'GET',
        })
        const data=await res.json()
        setClients(data?.result ?? [])
    }
  return (
    <Card size="sm" className="mx-auto w-full max-w-sm my-5">
      <CardHeader>
        <CardTitle>2. Клиент</CardTitle>
        <CardDescription className="uppercase">
          Поиск клиента по телефону
        </CardDescription>
      </CardHeader>
      <CardContent>
        
        <p>Телефон</p>
        <ButtonGroup className="w-full">
            <Input placeholder="+79990000000" disabled={!(stateStatus.status==='connected')} value={number} onChange={(e)=>{setNumber(e.target.value)}}/>
            <Button variant="outline" aria-label="Search" disabled={!(stateStatus.status==='connected')} onClick={handlerSearch}>
                <SearchIcon />
            </Button>
        </ButtonGroup>

        <Field className="w-full max-w-xs my-5">
        <FieldLabel>Найденный клиент</FieldLabel>
        <Select disabled={!(stateStatus.status==='connected')} value={stateStatus.contragent} onValueChange={(value) => stateStatus.setContragent(value)}>
            <SelectTrigger>
            <SelectValue placeholder="Клиент не выбран" />
            </SelectTrigger>
            <SelectContent>
            <SelectGroup>
                {clients?.map((cli:any)=>(
                    <SelectItem key={cli.id} value={String(cli.id)}>{cli.name} — {cli.phone}</SelectItem>
                ))}
            </SelectGroup>
            </SelectContent>
        </Select>
        </Field>

      </CardContent>
    </Card>
  )
}   