import Layout from "../components/layout";
import FileUpload from "../components/fileUpload";
import Charts from "../components/charts";

export default function Home() {
  return (
      <div>
        <Layout home>
          <Charts></Charts>
        </Layout>
      </div>
  );
}
