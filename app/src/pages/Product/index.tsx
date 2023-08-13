import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useLocation } from "react-router-dom";
import { productRequest } from "../../reducers/product";
import { Box } from "@mui/material";

const Product: React.FC = (props: any) => {
  const { pathname, hash } = useLocation(); // state is any or unknown
  const dispatch = useAppDispatch();
  const { action, product } = useAppSelector(state => state.product);

  useEffect(() => {
    if (!product) {
      // get id
      const id = pathname.split("/")[2];
      dispatch(productRequest(id));
    }
    if (hash.includes("comments")) {
      // Sélectionne l'élément de la section des commentaires
      const commentsSection = document.getElementById('comments');
      // Fait défiler la page vers la section des commentaires
      if (commentsSection) commentsSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  if (action.loading) {
    return (
      <div>Chargement...</div>
    );
  }

  return (
    <Box>
      <h1>{product?.title}</h1>
      <Box height={"800px"}>hehe</Box>
      <div id="comments">
        <h2>Commentaires</h2>
      </div>
    </Box>
  );
}

export default Product;
