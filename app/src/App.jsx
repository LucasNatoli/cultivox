import * as React from "react";

import { Carpa } from "./features/Carpa/components/Carpa";
import { Layout } from "./features/UI";

function App() {
  return (
    <Layout>
      <Carpa name="Carpa 1"/>
    </Layout>
  );
}

export default App;
