import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/layout";
import Home from "@/pages/home";
import About from "@/pages/about";
import Services from "@/pages/services";
import WhyMe from "@/pages/why-me";
import Contact from "@/pages/contact";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Layout>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/services" component={Services} />
            <Route path="/why-me" component={WhyMe} />
            <Route path="/contact" component={Contact} />
          </Switch>
        </Layout>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
