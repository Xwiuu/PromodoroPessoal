import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  /**
   * Estende a interface Session para incluir a propriedade accessToken.
   */
  interface Session {
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  /**
   * Estende a interface JWT para incluir a propriedade accessToken.
   */
  interface JWT {
    accessToken?: string;
  }
}
