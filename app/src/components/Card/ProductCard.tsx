import { Box, Button, Tooltip, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ProductType, productSuccess } from "../../reducers/product";
import Notation from "../Button/Notation";
import moment from "moment";
import { CommentBank, ArrowForward, Code } from "@mui/icons-material";
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
    <Tooltip title={moment(date).format("[Le] DD MMMM YYYY [à] HH[h]mm")}>
      <Box
        color="#9ca3af"
        fontSize="12px"
        display="flex"
        alignItems="center"
        gap={1}
      >
        {dateLabel}
      </Box>
    </Tooltip>
  );
};

const ShowDeal = ({ onClick, product }: { onClick: any, product: ProductType }) => {
  const [showCode, setShowCode] = useState(false);
  const color = showCode ? "primary.main" : "white";

  const handleDiscoundCode = (event: any) => {
    event.stopPropagation();
    setShowCode(true);
    if (product.discountCode) navigator.clipboard.writeText(product.discountCode);
  }

  return (
    <Box
      borderRadius="50vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      gap={0.5}
      onClick={product.discountCode ? handleDiscoundCode : onClick}
      fontSize={13}
      bgcolor={showCode ? "white" : "primary.main"}
      borderColor={"primary.main"}
      border={1}
      color={color}
      px={1}
      sx={{ cursor: showCode ? "copy" : "pointer" }}
    >
      {product.discountCode ?
        showCode ? (
          <Tooltip title="Le code a été copié">
            <Box sx={{ color }}>{product?.discountCode}</Box>
          </Tooltip>
        ) :
          "Voir le code" :
        "Voir le deal"
      }

      {!product.discountCode || showCode ? (
        <Tooltip title="Voir le deal">
          <ArrowForward onClick={showCode ? onClick : () => null} sx={{ width: 16, color, cursor: "pointer" }} />
        </Tooltip>
      ) : (
        <Tooltip title="Copier le code">
          <Code sx={{ width: 16, color }} />
        </Tooltip>
      )}
    </Box>
  );
};

const ProductCard = ({ product }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  function onNavigateProduct(toComments: boolean | any = false) {
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
        width={"100px"} height={"100px"}
        minWidth="100px"
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
        <Typography
          flexGrow={1}
          fontSize="small"
          sx={{
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
          }}
        >
          {product.description}
        </Typography>

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
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <ShowDeal
                product={product}
                onClick={onClickShowDeal}
              />
            </Box>
          </Box>
        </Box>
        <Box sx={{ mt: 0.5, display: { xs: "block", sm: "none" } }}>
          <ShowDeal
            product={product}
            onClick={onClickShowDeal}
          />
        </Box>
      </Box>

    </Box>
  );
};


export default ProductCard;
