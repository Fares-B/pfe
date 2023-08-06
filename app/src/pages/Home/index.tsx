import React, { useEffect } from "react";
import { productsRequest } from "../../reducers/product";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Card from "../../components/Card";
import { Box, CircularProgress } from "@mui/material";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, action, total } = useAppSelector((state) => state.product);

  useEffect(() => {
    dispatch(productsRequest({ page: 1, limit: 10, search: '' }));
  }, []);

  return (
    <Box py={2}>
      {/* <h1>Page d'accueil</h1> */}
      <div>total : {total}</div>
      <Box
        display="flex"
        flexDirection="column"
        gap="5px"
        pt={2}
      >
        {products.map(el => (
          <Card.ProductCard key={el.id} product={el} />
        ))}
      </Box>
      <Box display="flex" justifyContent="center">
        {action.loading && <CircularProgress />}
      </Box>
    </Box>
  );
}

export default Home;
