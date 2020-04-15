const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/juiceDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection
  .once('open', () => console.log('connected'))
  .on('error', error => {
    console.log('error');
  });

const juiceSchema = new mongoose.Schema({
  name: String,
  description: String,
  created: Date
});

const Juice = mongoose.model('Juice', juiceSchema);

const juice = new Juice({
  name: 'Orrange Juice',
  description:
    'Orange juice is really healthy, the best thing to get more vitamine "C',
  created: '2020-04-14'
});

const appleJuice = new Juice({
  name: 'Apple Juice',
  description:
    'Apple Juice a bit sour, but suits well for the mixing with whiskey',
  created: '2020-02-23'
});

const tomatoJuice = new Juice({
  name: 'Tomato Juice',
  description:
    'If you really want to eat a tomato, but do not want to sort it out, just drink the juice',
  created: '2010-01-27'
});

const ananasJuice = new Juice({
  name: 'Ananas Juice',
  created: '2020-03-08'
});

Juice.deleteMany({ name: 'Ananas Juice' }, function (error) {
  if (error) {
    console.log(error);
  } else {
    console.log('The juice was deleted.');
  }
});

Juice.find(function (error, juice) {
  if (error) {
    console.log(error);
  } else {
    juice.forEach(juice => {
      console.log(juice.name);
    });
  }
});

// ------- People section --------

const peopleSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Error: please enter the Name']
  },
  lastName: String,
  age: {
    type: Number,
    min: 4,
    max: 35
  },
  gender: String
});

const People = mongoose.model('People', peopleSchema);

const person1 = new People({
  firstName: 'Andrey',

  lastName: 'Tikhonov',
  age: 33,
  gender: 'male'
});

const person2 = new People({
  firstName: 'Oxana',
  lastName: 'Petrova',
  age: 22,
  gender: 'female'
});

People.insertMany([person1, person2], error => {
  if (error) {
    console.log(err);
  } else {
    console.log('Added');
  }
});

People.find(function (error, people) {
  if (error) {
    console.log(error);
  } else {
    people.forEach(people => {
      console.log(people);
    });
  }
});

People.update({ _id: '5e90230d0ff827dbd8deb6e8' }, { age: 30 }, function (
  error
) {
  if (error) {
    console.log(error);
  } else {
    console.log('Record successfully  updated');
  }
});

app.listen(process.env.PORT || 3000);
