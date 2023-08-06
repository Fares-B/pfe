import { Box, Button } from "@mui/material";
import { ProductType } from "../../reducers/product";
import { useNavigate } from "react-router-dom";

interface Props {
  product: ProductType;
};

const ProductCard = ({ product }: Props) => {
  const navigate = useNavigate();
  
  function onNavigateProduct() {
    navigate(`/deal/${product.id}`, { state: { product } });
  }

  function onClickShowDeal() {
    // open on new tab
    window.open(product.link, '_blank');
  }

  return (
    <Box
      border={1}
      borderRadius="4px"
      borderColor={"primary.main"}
      px={2} py={1}
      sx={{
        cursor: 'pointer',
      }}
      onClick={onNavigateProduct}
    >
      <Box
        fontSize="medium"
        sx={{
          ":hover": {
            textDecoration: 'underline',
          }
        }}
      >
        {product.title}
      </Box>

      <Box display="flex" justifyContent="flex-end">
        <Button onClick={onClickShowDeal}>
          Voir le deal
        </Button>
      </Box>
    </Box>
  );
};


export default ProductCard;
