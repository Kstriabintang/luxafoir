declare module "midtrans-client" {
  interface ClientOptions {
    isProduction: boolean;
    serverKey: string;
    clientKey?: string;
  }

  // Midtrans transaction payloads are loosely typed in the SDK.
  type TransactionParams = Record<string, unknown>;

  class Snap {
    constructor(options: ClientOptions);
    createTransaction(params: TransactionParams): Promise<{
      token: string;
      redirect_url: string;
    }>;
    createTransactionToken(params: TransactionParams): Promise<string>;
  }

  class CoreApi {
    constructor(options: ClientOptions);
    charge(params: TransactionParams): Promise<Record<string, unknown>>;
    transaction: {
      status(orderId: string): Promise<Record<string, unknown>>;
      notification(payload: unknown): Promise<Record<string, unknown>>;
      cancel(orderId: string): Promise<Record<string, unknown>>;
    };
  }

  const midtransClient: { Snap: typeof Snap; CoreApi: typeof CoreApi };
  export default midtransClient;
  export { Snap, CoreApi };
}
