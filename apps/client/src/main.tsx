import * as ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { PrimeReactProvider } from "primereact/api";
import Tailwind from "primereact/passthrough/tailwind";
import { Theme } from "@radix-ui/themes";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = ReactDOM.createRoot(document.querySelector("#root")!);

root.render(
    <PrimeReactProvider value={{unstyled: true, pt: Tailwind}}>
        {/* <Theme> */}
            <RouterProvider router={router} />
        {/* </Theme> */}
    </PrimeReactProvider>
);
