import React from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className="mx-auto max-w-xl p-4 sm:p-6 md:p-8">{children}</div>;
};

export default Container;
