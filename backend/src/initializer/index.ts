import mongoose from 'mongoose';


export default async (callback: () => void, config: any) => {
  try {
    mongoose.connect(
      `${config.mongoDbUrl}`,
      { poolSize: 10 },
      (err) => {
        if (err) {
          throw err;
        }
        mongoose.set('debug', config.mongooseDebug === 'true' ? true : false);
        callback();
      }
    );
  } catch (err) {
    throw err;
  }
};
