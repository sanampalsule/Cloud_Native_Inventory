const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

const port = process.env.PORT || 8080;
const app = express();
app.use(express.json());
app.listen(port, () => console.log(`Sample app is listening on port ${port}!`))

app.get('/', function (req, res) {
  
    console.log(`Server is running on port ${port}!`)
  });
  console.log("Reached GET method");
  const sequelize = new Sequelize({
    dialect: 'postgres',
    username: 'Student',
    password: 'Pa55w0rd1234',
    host: 'na-db-server.postgres.database.azure.com', 
    port: 5432,
    database: 'cnainventory',
    dialectOptions: {
      ssl: {
        require: false,
        rejectUnauthorized: false
      }
    }
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const Inventory = sequelize.define('inventory', {
  id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  quantity: { type: DataTypes.INTEGER },
  date: { type: DataTypes.DATEONLY, defaultValue: Sequelize.NOW }
}, {
  freezeTableName: true,
  timestamps: false
});

app.get('/inventory/:id', async (req, res) => {
    const id = req.params.id
    try {
        console.log("Here in get2");
    console.log(id);
    const inventory = await Inventory.findAll({
    attributes: ['id', 'name', 'quantity', 'date'],
    where: {
    id: id
    }})
    console.log('hiii', inventory)
    res.json({ inventory })
    
    } catch(error) {
    console.error(error)
    }})
app.post('/inventory', async (req, res) => {
    console.log("Reached POST method");
    try {
    const newItem = new Inventory(req.body)
    await newItem.save()
    res.json({ inventory: newItem })
    } catch(error) {
    console.error(error)
    }})