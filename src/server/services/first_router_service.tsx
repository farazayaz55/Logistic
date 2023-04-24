interface input{
    text:string
}

export const first_router_service={
    hello:(input:input)=>{
        return {greeting:`hello ${input.text}`}
    }
}