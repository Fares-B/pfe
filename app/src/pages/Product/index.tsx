import React, { useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";
import { useLocation } from "react-router-dom";

const Product: React.FC = (props: any) => {
  const { state } = useLocation(); // state is any or unknown
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(state);
    // if (!props.match.params.id) {
    //   props.history.push('/');
    //   // dispatch(productRequest({ id: props.match.params.id }))      
    // }
  }, []);

  return (
    <div>
      <h1>{state.product.title}</h1>
    </div>
  );
}

export default Product;
