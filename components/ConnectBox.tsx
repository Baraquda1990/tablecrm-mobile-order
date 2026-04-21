'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import useStatus from "@/hooks/useStatus"
import { toast } from "sonner"
import { useEffect } from "react"
import { useStore } from "@/hooks/useStore"

export default function Box(){
    const stateUseStatus=useStatus()
    const stateStore=useStore()
    useEffect(() => {
    const savedToken = localStorage.getItem('token')
      if (savedToken) {
        stateUseStatus.set_input_token(savedToken)
      }
    }, [])
    const handleConnect=async()=>{
        stateUseStatus.set_status('connect')
        if(stateUseStatus.input_token.length==0){
            toast.warning("Введите токен кассы",{ position:"top-center"})
            stateUseStatus.set_status('disconnected')
            return
        }
        const res = await fetch(`/api/start?token=${stateUseStatus.input_token}`,
        {
            method: 'GET',
        })
        let data=await res.json()
        if(data.error){
            toast.warning(data.error,{ position:"top-center"})
            stateUseStatus.set_status('disconnected')
            return
        }else{
          stateUseStatus.set_status('connected')
          stateUseStatus.set_token(stateUseStatus.input_token)
          localStorage.setItem('token', stateUseStatus.input_token)
          stateStore.setData(data)
          toast.success("Успешное подключение",{ position:"top-center"})
        }
    }
  return (
    <Card size="sm" className="mx-auto w-full max-w-sm my-5">
      <CardHeader>
        <CardTitle>1. Подключение кассы</CardTitle>
        <CardDescription>
          Введите токен и загрузите справочники
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Input 
            placeholder="Введите токен" 
            onChange={(e)=>{stateUseStatus.set_input_token(e.target.value)}}
            value={stateUseStatus.input_token}
        />
      </CardContent>
      <CardFooter>
        <Button className="w-full" disabled={!(stateUseStatus.status==='disconnected')} onClick={handleConnect}>
            {(stateUseStatus.status==='connect')?(<><Spinner data-icon="inline-start" />Подключение</>):(<>Подключить</>)}
        </Button>
      </CardFooter>
    </Card>
  )
}

