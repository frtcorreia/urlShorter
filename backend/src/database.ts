import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "mysql://root:123456@localhost:3306/urlshorter_dev"
);

export default sequelize;
