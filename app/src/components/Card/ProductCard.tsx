import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ProductType, productSuccess } from "../../reducers/product";
import Notation from "../Button/Notation";
import moment from "moment";
import { CommentBank, ArrowForward } from "@mui/icons-material";
import { useAppDispatch } from "../../store/hooks";
import { useState } from "react";

interface Props {
  product: ProductType;
};

const DateLabel = ({ date }: { date: string }) => {

  // if diff is more than 24h, show date like 11 août. else show 55 min.
  const momentDate = moment(date);
  const dateLabel = moment().diff(momentDate, 'hours') <= 24 ?
    momentDate.fromNow() :
    momentDate.format('DD MMMM');


  return (
    <Box
      color="#9ca3af"
      fontSize="12px"
      display="flex"
      alignItems="center"
      gap={1}
    >
      {dateLabel}
    </Box>
  );
};

const ShowDeal = ({ onClick, product }: { onClick: any, product: ProductType }) => {
  const [showCode, setShowCode] = useState(false);
  const color = !product.discountCode || showCode ? "white" : "primary.main";
  if (product.discountCode) {
    
  }

  const handleDiscoundCode = (event: any) => {
    event.stopPropagation();
    setShowCode(true);
  }

  return (
    <Box
      borderRadius="50vh"
      display="flex"
      gap={0.5}
      alignItems="center"
      onClick={showCode || !product.discountCode ? onClick : handleDiscoundCode}
      fontSize={13}
      bgcolor={!product.discountCode || showCode ? "primary.main" : "white"}
      color={color}
      px={1}
    >
      {showCode || !product.discountCode ? "Voir le code" : "Voir le deal"}
      <ArrowForward sx={{ width: 16, color }} />
    </Box>
  );
};

const ProductCard = ({ product }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  function onNavigateProduct(toComments: boolean|any = false) {
    const suffix = toComments === true ? "#comments" : "";
    dispatch(productSuccess(product));
    navigate(`/deal/${product.id}${suffix}`);
  }

  function onShowComments(event: any) {
    event.stopPropagation();
    onNavigateProduct(true);
  }

  function onClickShowDeal(event: any) {
    event.stopPropagation();
    // open on new tab
    window.open(product.link, '_blank');
  }

  function onShowProfile(author: any) {
    console.log("on show profile", author);
  }

  return (
    <Box
      // border={1}
      bgcolor={"background.paper"}
      borderRadius="4px"
      // borderColor={"primary.main"}
      px={2} py={1}
      sx={{ cursor: 'pointer' }}
      display="flex"
      gap={2}
      onClick={onNavigateProduct}
    >
      <Box
        width={100} height={100}
        bgcolor="#e9eaed"
        borderRadius="4px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        position="relative" // Ajout d'une position relative pour contenir l'image
        overflow="hidden" // Masque le contenu qui dépasse la boîte
      >
        <img
          src={product.image}
          alt={product.title}
          // height={100}
          style={{
            width: 'auto',
            height: '100%',
            objectFit: 'contain',
            position: 'absolute', // Position absolue pour l'image
            top: 0, // Alignement en haut
            left: '50%', // Alignement au centre horizontalement
            transform: 'translateX(-50%)', // Centrage horizontal
          }}
        />
      </Box>
      <Box flexGrow={1} display="flex" flexDirection="column">
        <Box display="flex" justifyContent="space-between">
          <Notation rate={product.rate} />
          <DateLabel date={product.createdAt} />
        </Box>
        <Box
          fontSize="medium"
          flexGrow={1}
          display="flex"
          sx={{ ':hover': { textDecoration: "underline" } }}
        >
          {product.title}
        </Box>

        <Box display="flex" justifyContent="space-between" alignItems="flex-end">
          <Box
            display="flex" gap={1}
            sx={{ ':hover': { textDecoration: "underline" } }}
            onClick={(event: any) => { event.stopPropagation(); onShowProfile(product.author); }}
          >
            <img
              src="https://www.dealabs.com/assets/img/profile-listing-placeholder_fecff.png"
              alt="hot"
              width={20} height={20}
              style={{ borderRadius: "100%" }}
            />
            <Box fontSize="13px">
              {product.author.username}
            </Box>
          </Box>
          <Box display="flex" gap={2}>
            <Button onClick={() => console.log("on press save")} sx={{ p: 0 }}>
              Save
            </Button>
            <Box
              borderRadius="50vh"
              border={1}
              borderColor={"#bfc3c8"}
              display="flex"
              alignItems="center"
              gap={1}
              px={1}
              onClick={onShowComments}
            >
              <CommentBank sx={{ width: 16, color: "#7e838a" }} />
              <Box fontSize="12px" color="#7e838a">
                {product.comments.length}
              </Box>
            </Box>
            <ShowDeal
              product={product}
              onClick={onClickShowDeal}
            />
          </Box>
        </Box>
      </Box>

    </Box>
  );
};


export default ProductCard;
