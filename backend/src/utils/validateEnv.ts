import { cleanEnv, port, str, host } from 'envalid';

const validateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port(),
    DB_USER: str(),
    DB_PASSWORD: str(),
    DB_HOST: host(),
    DB_DATABASE: str(),
  });
};

export default validateEnv;
