import "react-router";

declare module "react-router" {
  interface Register {
    params: Params;
  }

  interface Future {
    unstable_middleware: false
  }
}

type Params = {
  "/": {};
  "/blog/:handle": {
    "handle": string;
  };
  "/blog": {};
  "/booking": {};
  "/contact": {};
  "/reviews": {};
  "/about": {};
  "/faq": {};
};