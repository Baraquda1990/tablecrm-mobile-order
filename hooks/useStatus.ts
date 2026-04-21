import {create} from 'zustand'
type statusType='connected'|'disconnected'|'connect'
type cardType={
    id:number,
    count:number
    name:string,
    price:number
}
interface statusInterface{
    status:statusType
    set_status:(value:statusType)=>void
    input_token:string
    set_input_token:(value:string)=>void
    token:string
    set_token:(value:string)=>void
    card:cardType[]
    setCard:(item:cardType)=>void
    removeCard:(id:number)=>void
    clearCard:()=>void
    organization:string
    setOrganization:(value:string)=>void
    contragent:string
    setContragent:(value:string)=>void
    warehouse:string
    setWarehouse:(value:string)=>void
    paybox:string
    setPaybox:(value:string)=>void
    price_type:string
    setPrice_type:(value:string)=>void
    comment:string
    setComment:(value:string)=>void
}
const useStatus=create<statusInterface>((set)=>({
    status:'disconnected',
    set_status:(value:statusType)=>set({status:value}),
    input_token:'',
    set_input_token:(value:string)=>set({input_token:value}),
    token:'',
    set_token:(value:string)=>set({token:value}),
    card:[],
    setCard: (item) =>
  set((state) => {
    const existing = state.card.find((c) => c.id === item.id)

    if (existing) {
      return {
        card: state.card.map((c) =>
          c.id === item.id
            ? { ...c, count: c.count + 1 }
            : c
        ),
      }
    }

    return {
      card: [...state.card, item],
    }
  }),
  removeCard: (id: number) =>
  set((state) => ({
    card: state.card.filter((c) => c.id !== id),
  })),
    clearCard: () => set({ card: [] }),
    organization:'',
    setOrganization:(value:string)=>set({organization:value}),
    contragent:'',
    setContragent:(value:string)=>set({contragent:value}),
    warehouse:'',
    setWarehouse:(value:string)=>set({warehouse:value}),
    paybox:'',
    setPaybox:(value:string)=>set({paybox:value}),
    price_type:'',
    setPrice_type:(value:string)=>set({price_type:value}),
    comment:'',
    setComment:(value:string)=>set({comment:value}),
}))
export default useStatus