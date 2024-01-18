const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('YOUR_MONGODB_URI', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// User Schema for registration and login
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

// Application Schema
const applicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  username: String,
  email: String,
  contactNumber: String,
  numberOfFloors: Number,
  numberOfSlots: Number,
});

const Application = mongoose.model('Application', applicationSchema);

// Rejected Application Schema
const rejectedApplicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  username: String,
  email: String,
  contactNumber: String,
  numberOfFloors: Number,
  numberOfSlots: Number,
});

const RejectedApplication = mongoose.model('RejectedApplication', rejectedApplicationSchema);

// Accepted Application Schema
const acceptedApplicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  username: String,
  email: String,
  contactNumber: String,
  numberOfFloors: Number,
  numberOfSlots: Number,
});

const AcceptedApplication = mongoose.model('AcceptedApplication', acceptedApplicationSchema);

// JWT Secret Key
const JWT_SECRET_KEY = 'your-secret-key';

const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: 'Forbidden' });
    req.user = user;
    next();
  });
};

// Registration route
app.post('/api/register', async (req, res) => {
  const { userName, email, password, contactNumber, numberOfFloors, numberOfSlots  }= req.body;

  try {
    const user = new User({ userName, email, password, contactNumber, numberOfFloors, numberOfSlots  });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Login route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ email: user.email, userName: user.userName }, JWT_SECRET_KEY);
    res.json({ token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Apply route
app.post('/api/apply', authenticateJWT, async (req, res) => {
  const { userId, username, email, contactNumber, numberOfFloors, numberOfSlots } = req.body;

  try {
    const application = new Application({ userId, username, email, contactNumber, numberOfFloors, numberOfSlots });
    await application.save();
    res.status(201).json({ message: 'Application submitted successfully' });
  } catch (err) {
    console.error('Application error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get applications route
app.get('/api/applications', authenticateJWT, async (req, res) => {
  try {
    const applications = await Application.find({ userId: req.user._id });
    res.json({ applications });
  } catch (err) {
    console.error('Get applications error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Reject application route
app.post('/api/reject-application/:applicationId', authenticateJWT, async (req, res) => {
  const { applicationId } = req.params;

  try {
    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    const rejectedApplication = new RejectedApplication(application);
    await rejectedApplication.save();
    await Application.findByIdAndDelete(applicationId);

    res.json({ message: 'Application rejected successfully' });
  } catch (err) {
    console.error('Reject application error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Accept application route
app.post('/api/accept-application/:applicationId', authenticateJWT, async (req, res) => {
  const { applicationId } = req.params;

  try {
    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    const acceptedApplication = new AcceptedApplication(application);
    await acceptedApplication.save();
    await Application.findByIdAndDelete(applicationId);

    res.json({ message: 'Application accepted successfully' });
  } catch (err) {
    console.error('Accept application error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});