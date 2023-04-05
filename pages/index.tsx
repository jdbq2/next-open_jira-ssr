import { Layout } from "@/components/layouts";
import { Typography } from "@mui/material";
import { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Layout>
      <Typography variant="h1" color="primary">
        Hola Mundo
      </Typography>
    </Layout>
  );
};

export default Home;
