import { ReactNode } from "react";
import "./global.scss";
import { Header } from "@components/layout/Header";
import "../styles/base/_reset.scss";
import "../styles/base/_font.scss";
import ReduxProvider from "src/redux/provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Props {
  children: ReactNode;
}

const RootLayout = ({ children }: Props) => (
  <html lang="ko">
    <head />
    <body>
      <ReduxProvider>
        <Header />
        {children}
        <div id="modal-root" />
      </ReduxProvider>
      <ToastContainer />
    </body>
  </html>
);

export default RootLayout;
