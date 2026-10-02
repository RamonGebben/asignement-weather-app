import { createContext } from '~/server/context';
import { createTrpcHandler } from '~/server/handler';

const handler = createTrpcHandler(createContext);

export { handler as GET, handler as POST };
