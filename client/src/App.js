import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

import MainNav from "./components/MainNav";
import CategoryNav from "./components/CategoryNav";
import NewProject from "./pages/NewProject";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import CategoryPage from "./components/CategoryPage";
import "./App.css";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <CookiesProvider>
        <Router>
          <MainNav />
          <CategoryNav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/NewProject" element={<NewProject />} />
            <Route path="/education" element={<CategoryPage />} />
            <Route path="/community-outreach" element={<CategoryPage />} />
            <Route path="/health-care" element={<CategoryPage />} />
            <Route path="/religious" element={<CategoryPage />} />
            <Route path="/family-services" element={<CategoryPage />} />
            <Route path="/other" element={<CategoryPage />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
          <Footer />
        </Router>
      </CookiesProvider>
    </ApolloProvider>
  );
}

export default App;
