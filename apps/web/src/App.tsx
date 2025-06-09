import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CountryExplorer } from "./components/CountryExplorer";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
      <CountryExplorer />
  </QueryClientProvider>
);

export default App;
