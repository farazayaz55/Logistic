import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });
import 'swagger-ui-react/swagger-ui.css';


const Home: NextPage = () => {
  // Serve Swagger UI with our OpenAPI schema
  return <SwaggerUI url="/api/openapi.json" />;
};

export default Home;