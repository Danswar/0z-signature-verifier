import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { RailgunEngineProvider } from "./context/railgun-engine.context";
import { AppConfigurationsProvider } from "./context/app-configurations.context";
import Layout from "./components/Layout/Layout";
import AddressGenerator from "./screens/address-generator.screen";

const App: React.FC = () => {
  return (
    <AppConfigurationsProvider>
      <RailgunEngineProvider>
        <Layout />
      </RailgunEngineProvider>
    </AppConfigurationsProvider>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{ index: true, element: <AddressGenerator /> }],
  },
]);

export default () => <RouterProvider router={router} />;
