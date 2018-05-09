const SequelizeAuto = require('sequelize-auto')
const auto = new SequelizeAuto('teacher', 'root', 'nckucsieweb', {
    host: '140.116.245.105',
    dialect:  'mysql',
    directory: false, // prevents the program from writing to disk
    port: 3306,
    additional: {
        timestamps: false
        },
});

auto.run(function (err) {
  if (err) throw err;
  console.log(auto.tables); // table list
  console.log(auto.foreignKeys); // foreign key list
});