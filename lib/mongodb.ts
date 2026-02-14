import { MongoClient } from "mongodb";

const MONGODB_URI =
  "mongodb+srv://parvati:parvati@cluster0.frnwhyz.mongodb.net/?appName=Cluster0";

if (!MONGODB_URI) {
  throw new Error("Missing MONGODB_URI");
}

type MongoCache = {
  client: MongoClient | null;
  promise: Promise<MongoClient> | null;
};

declare global {
  // eslint-disable-next-line no-var
  var mongoClientCache: MongoCache | undefined;
}

const cached: MongoCache = global.mongoClientCache ?? {
  client: null,
  promise: null,
};

global.mongoClientCache = cached;

export async function getMongoClient() {
  if (cached.client) return cached.client;
  if (!cached.promise) {
    const client = new MongoClient(MONGODB_URI);
    cached.promise = client.connect();
  }
  cached.client = await cached.promise;
  return cached.client;
}
