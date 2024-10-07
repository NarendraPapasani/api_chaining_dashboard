import React from "react";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl text-center mb-8 font-bold">
          API Chain Builder
        </h1>
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
