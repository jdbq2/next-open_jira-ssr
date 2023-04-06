import { Layout } from "@/components/layouts";
import { Card, CardContent, CardHeader, Grid } from "@mui/material";
import { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Layout title="Home Open Jira">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 100px )" }}>
            <CardHeader title="pendientes" />
            <CardContent>
              {/* Agregar nueva entrada */}
              {/* Listar entradas */}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 100px )" }}>
            <CardHeader title="progreso" />
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 100px )" }}>
            <CardHeader title="completadas" />
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Home;
