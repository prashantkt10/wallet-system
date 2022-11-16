import { DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE } from '../config';

export const dbConnection = {
  url: `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_DATABASE}?retryWrites=true&w=majority`,
  options: {
    useUnifiedTopology: true,
  },
};
