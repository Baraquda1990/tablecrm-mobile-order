import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import BoxStatus from "./BoxStatus"

export default function Box(){
  return (
    <Card size="sm" className="mx-auto w-full max-w-sm my-5">
      <CardHeader>
        <CardTitle>Мобильный заказ</CardTitle>
        <CardDescription className="uppercase">
          tablecrm.com
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          WebApp для создания продажи и проведения в один клик.
        </p>
      </CardContent>
      <CardFooter>
        <BoxStatus/>
      </CardFooter>
    </Card>
  )
}

