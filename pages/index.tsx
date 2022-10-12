import Layout from "../components/layout";
import FileUpload from "../components/fileUpload";

export default function Home() {
  return (
      <div>
        <Layout home>
          <FileUpload></FileUpload>
        </Layout>
      </div>
  );
}
