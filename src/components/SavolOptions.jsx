import { Box, Typography, Grid, Paper } from "@mui/material";

const SavolOptions = ({ optionsUz = [], optionsRu = [] }) => {
  return (
    <Box mt={4}>
      <Typography variant="h6" gutterBottom>
        Variantlar (UZ / RU)
      </Typography>
      <Grid container spacing={4}>
        {/* Uzbekcha variantlar chapda */}
        <Grid item xs={6}>
          <Typography variant="subtitle1" gutterBottom>
            Uzbekcha
          </Typography>
          {optionsUz.map((optUz, index) => (
            <Paper
              key={`uz-${optUz.id}`}
              elevation={3}
              sx={{
                padding: 2,
                marginBottom: 2,
                backgroundColor: optUz.isCorrect ? "#e6ffe6" : "#fff",
              }}
            >
              <Typography variant="body1">
                {index + 1}. {optUz.value}
              </Typography>
            </Paper>
          ))}
        </Grid>

        {/* Ruscha variantlar o'ngda */}
        <Grid item xs={6}>
          <Typography variant="subtitle1" gutterBottom>
            Русский
          </Typography>
          {optionsRu.map((optRu, index) => (
            <Paper
              key={`ru-${optRu.id}`}
              elevation={3}
              sx={{
                padding: 2,
                marginBottom: 2,
                backgroundColor: optRu.isCorrect ? "#e6ffe6" : "#fff",
              }}
            >
              <Typography variant="body1">
                {index + 1}. {optRu.value}
              </Typography>
            </Paper>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default SavolOptions;
