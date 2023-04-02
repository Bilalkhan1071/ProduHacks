const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient;

const app = express();

app.use(cors());
app.use(bodyParser.json());

const uri = 'mongodb://your_mongodb_uri';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('Connected to MongoDB');

  const db = client.db('your_db_name');

  // Add your API routes here

  // Get all patients
  app.get('/api/patients', async (req, res) => {
    const patients = await db.collection('patients').find().toArray();
    res.json(patients);
  });

  // Add a new patient
  app.post('/api/patients', async (req, res) => {
    const patient = req.body;
    await db.collection('patients').insertOne(patient);
    res.json(patient);
  });

  // Get patient by ID
  app.get('/api/patients/:id', async (req, res) => {
    const id = new mongodb.ObjectId(req.params.id);
    const patient = await db.collection('patients').findOne({ _id: id });
    res.json(patient);
  });

  // Update patient by ID
  app.put('/api/patients/:id', async (req, res) => {
    const id = new mongodb.ObjectId(req.params.id);
    const updates = req.body;
    await db.collection('patients').updateOne({ _id: id }, { $set: updates });
    res.json(updates);
  });

  // Delete patient by ID
  app.delete('/api/patients/:id', async (req, res) => {
    const id = new mongodb.ObjectId(req.params.id);
    await db.collection('patients').deleteOne({ _id: id });
    res.json({ message: 'Patient deleted' });
  });

  // Add a reminder for a patient
  app.post('/api/patients/:id/reminders', async (req, res) => {
    const id = new mongodb.ObjectId(req.params.id);
    const reminder = req.body;
    await db.collection('reminders').insertOne({ ...reminder, patientId: id });
    res.json(reminder);
  });

  // Send a reminder to a patient
  app.post('/api/patients/:id/reminders/:reminderId/send', async (req, res) => {
    // Implement your reminder sending logic here, e.g., sending an SMS or email
    res.json({ message: 'Reminder sent' });
  });

  const PORT = process.env.PORT || 3001;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
