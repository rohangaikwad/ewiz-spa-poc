import Layout from "./layout";
import RoutesComponent from "./routes";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
        <RoutesComponent />
    </QueryClientProvider>
  );
}

export default App;
