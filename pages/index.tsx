import { Layout } from "@/components/layouts";
import { EntryList, NewEntry } from "@/components/ui";
import { Card, CardHeader, Grid } from "@mui/material";
import { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Layout title="Home Open Jira">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 100px )" }}>
            <CardHeader title="Pendientes" />
            <NewEntry />
            <EntryList status="pending" />
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 100px )" }}>
            <CardHeader title="En Progreso" />
            <EntryList status="in-progress" />
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 100px )" }}>
            <CardHeader title="Completadas" />
            <EntryList status="finished" />
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Home;
