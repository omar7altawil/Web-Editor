// import loggerFactory from '../utils/logging';
const logger = console;
const config: {
    host: string;
    port: string;
    questionsBankUri: string;
    mongoDbName: string;
    mongoDbUrl: string;
} = <any>{
    port: 3000,
    mongoDbUrl: 'mongodb://localhost:27017/questions-db'
};

if (typeof process.env.APP_HOST !== 'undefined') {
    config.host = process.env.APP_HOST;
}
if (typeof process.env.APP_PORT !== 'undefined') {
    config.port = process.env.APP_PORT;
}
if (typeof process.env.QUESTIONS_BANK_URI !== 'undefined') {
    config.questionsBankUri = process.env.QUESTIONS_BANK_URI;
}

if (typeof process.env.MONGO_DB_NAME !== 'undefined') {
    config.mongoDbName = process.env.MONGO_DB_NAME;
}
if (typeof process.env.MONGO_DB_URL !== 'undefined') {
    config.mongoDbUrl = process.env.MONGO_DB_URL;
}

// const logger = loggerFactory.getLogger('Config');
// logger.info(
//     '----------------------------------------------------------------------------'
// );
// logger.info('Env variables for the app: %o', process.env);
// logger.info(
//     '----------------------------------------------------------------------------'
// );
// logger.info('Config for the app: %o', config);
// logger.info(
//     '----------------------------------------------------------------------------'
// );

// if (!config.host || config.host === '') {
//     logger.error('Missing parameter: APP_HOST! Exiting...');
//     process.exit(1);
// }
// if (!config.port || config.port === '') {
//     logger.error('Missing parameter: APP_PORT! Exiting...');
//     process.exit(1);
// }
// if (!config.knowledgeGraphUri || config.knowledgeGraphUri === '') {
//     logger.error('Missing parameter: KNOWLEDGE_GRAPH_URI! Exiting...');
//     process.exit(1);
// }
// if (!config.userProgressUri || config.userProgressUri === '') {
//     logger.error('Missing parameter: USER_PROGRESS_URI! Exiting...');
//     process.exit(1);
// }
if (!config.mongoDbName || config.mongoDbName === '') {
    logger.error('Missing parameter: mongoDbName! Exiting...');
    // process.exit(1);
}
if (!config.mongoDbUrl || config.mongoDbUrl === '') {
    logger.error('Missing parameter: mongoDbUrl! Exiting...');
    // process.exit(1);
}

export default config;