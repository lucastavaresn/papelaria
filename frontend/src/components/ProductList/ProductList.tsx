import { Props } from "../../utils/ChildProps"


export const ProductList = ({products, ...props}: Props)  =>{
    return(
        <>
             {products.map((product: any) => (
                    <div key={product.product}>
                        <div>{product.label}</div>
                      <div>{product.quantity}</div>
                      <div >R$ {product.price}</div>
                      <div >R$ {(product.price * product.quantity)}</div>
                    </div>
                  ))}
        </>
    )
}