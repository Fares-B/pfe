import { Box } from "@mui/material";

const RateButton = ({ isPositive, onPress }: { isPositive: boolean, onPress: any }) => {
  const color = isPositive ? "rgb(224,0,52)" : "rgb(3,165,193)";
  const bgcolor = isPositive ? "rgba(224,0,52,0.1)" : "rgba(3,165,193, 0.1)";
  return (
    <Box onClick={onPress}>
      <Box
        sx={{
          color,
          borderRadius: "50vh",
          height: 16, width: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: isPositive ? "17px" : "25px",
          cursor: "pointer",
          ":hover": { bgcolor },
        }}
      >
        {isPositive ? "+" : "-"}
      </Box>
    </Box>
  );
};

const Notation = ({ rate = 0 }: { rate: number | undefined }) => {

  function onPressNegative() {
    console.log("on press -1", rate)
  }
  function onPressPositive() {
    console.log("on press +1")
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      gap={1}
      borderRadius="100px"
      borderColor="#d1d5db"
      border={1}
      px={0.3}
      py={0.2}
      sx={{ cursor: 'default' }}
      onClick={(event: any) => event.stopPropagation()}
    >
      <RateButton isPositive={false} onPress={onPressNegative} />

      <Box
        color={rate >= 50 ? "#e00034" : rate < 0 ? "#03a5c1" : "black"}
        fontSize="12px"
      >
        {rate < 50 && rate >= 0 ? "Nouveau" : rate}
      </Box>

      <RateButton isPositive={true} onPress={onPressPositive} />
    </Box>
  );
};

export default Notation;
