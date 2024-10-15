import { globalStyles } from "@/styles/globals";
import { Container, Header } from "@/styles/pages/app";
import type { AppProps } from "next/app";
import Image from "next/image";

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Image alt="Logo Image" src={'/logo.svg'} width={129} height={52} className="" />
      </Header>

      <Component {...pageProps} />
    </Container>
  );
}
