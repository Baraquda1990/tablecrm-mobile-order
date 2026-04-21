'use client'
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
import { useStore } from "@/hooks/useStore"

export default function Sales(){
    const stateStatus=useStatus()
    const organizations = useStore(
        (state) => state.data?.organizations?.result
    )
    const payboxes = useStore(
        (state) => state.data?.payboxes?.result
    )
    const warehouses = useStore(
        (state) => state.data?.warehouses?.result
    )
    const price_types = useStore(
        (state) => state.data?.price_types?.result
    )
  return (
    <Card size="sm" className="mx-auto w-full max-w-sm my-5">
        <CardHeader>
        <CardTitle>3. Параметры продажи</CardTitle>
        <CardDescription className="uppercase">
            Счёт, организация, склад и тип цены
        </CardDescription>
        </CardHeader>
        <CardContent>

        <Field className="w-full max-w-xs my-5">
        <FieldLabel>Организация</FieldLabel>
        <Select disabled={!(stateStatus.status==='connected')} value={stateStatus.organization} onValueChange={(value) => stateStatus.setOrganization(value)}>
            <SelectTrigger>
            <SelectValue placeholder="Выберите организацию" />
            </SelectTrigger>
            <SelectContent>
            <SelectGroup>
                {organizations?.map((org:any)=>(
                    <SelectItem key={org.id} value={String(org.id)} >{org.work_name||org.short_name}</SelectItem>
                ))}
            </SelectGroup>
            </SelectContent>
        </Select>
        </Field>

        <Field className="w-full max-w-xs my-5">
        <FieldLabel>Счет</FieldLabel>
        <Select disabled={!(stateStatus.status==='connected')} value={stateStatus.paybox} onValueChange={(value) => stateStatus.setPaybox(value)}>
            <SelectTrigger>
            <SelectValue placeholder="Выберите счет" />
            </SelectTrigger>
            <SelectContent>
            <SelectGroup>
                {payboxes?.map((pbx:any)=>(
                    <SelectItem key={pbx.id} value={String(pbx.id)}>{pbx.name}</SelectItem>
                ))}
            </SelectGroup>
            </SelectContent>
        </Select>
        </Field>

        <Field className="w-full max-w-xs my-5">
        <FieldLabel>Склад</FieldLabel>
        <Select disabled={!(stateStatus.status==='connected')} value={stateStatus.warehouse} onValueChange={(value) => stateStatus.setWarehouse(value)}>
            <SelectTrigger>
            <SelectValue placeholder="Выберите склад" />
            </SelectTrigger>
            <SelectContent>
            <SelectGroup>
                {warehouses?.map((wrh:any)=>(
                    <SelectItem key={wrh.id} value={String(wrh.id)}>{wrh.name}</SelectItem>
                ))}
            </SelectGroup>
            </SelectContent>
        </Select>
        </Field>

        <Field className="w-full max-w-xs my-5">
        <FieldLabel>Тип цены</FieldLabel>
        <Select disabled={!(stateStatus.status==='connected')} value={stateStatus.price_type} onValueChange={(value) => stateStatus.setPrice_type(value)}>
            <SelectTrigger>
            <SelectValue placeholder="Выберите тип цены" />
            </SelectTrigger>
            <SelectContent>
            <SelectGroup>
                {price_types?.map((prc:any)=>(
                    <SelectItem key={prc.id} value={String(prc.id)}>{prc.name}</SelectItem>
                ))}
            </SelectGroup>
            </SelectContent>
        </Select>
        </Field>

        </CardContent>
    </Card>
  )
}
