import { Button } from "@/components/ui/button"
import Box from "@/components/Box"
import ConnectBox from "@/components/ConnectBox"
import Sales from "@/components/Sales"
import Client from "@/components/Client"
import Product from "@/components/Products"
import Cardd from "@/components/Cardd"
import Comments from "@/components/Comment"
import CreateOrder from "@/components/CreateOrder"
export default function Page() {
  return (
    <div className="mx-auto w-full max-w-md px-5 py-5">
        <Box/>
        <ConnectBox/>
        <Client/>
        <Sales/>
        <Product/>
        <Cardd/>
        <Comments/>
        <CreateOrder/>
    </div>
  )
}
