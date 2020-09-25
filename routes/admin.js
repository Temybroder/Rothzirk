const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const members = require('../../Members');
const drivers = require('../../drivers');
const riderequests = require('../../riderequests');
const logistics = require('../../logistics');



const idFilter = req => member => member.id === parseInt(req.params.id);
//USER
// Gets All Users
router.get('/', (req, res) => res.json(members));

// Get Single Member
router.get('/:id', (req, res) => {
  const found = members.some(idFilter(req));

  if (found) {
    res.json(members.filter(idFilter(req)));
  } else {
    res.status(400).json({ msg: `No User with the id of ${req.params.id}` });
  }
});

// Delete Member
router.delete('/:id', (req, res) => {
  const found = members.some(idFilter(req));

  if (found) {
    res.json({
      msg: 'Member deleted',
      members: members.filter(member => !idFilter(req)(member))
    });
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});



// DRIVERS
//Gets All Drivers
router.get('/', (req, res) => res.json(drivers));

// Get Single Driver
router.get('/:id', (req, res) => {
  const found = drivers.some(idFilter(req));

  if (found) {
    res.json(drivers.filter(idFilter(req)));
  } else {
    res.status(400).json({ msg: `No driver with the id of ${req.params.id} found` });
  }
});

// Create driver
router.post('/', (req, res) => {
  const newDriver = {
    ...req.body,
    id: uuid.v4(),
    status: 'active'
  };

  if (!newDriver.name || !newDriver.email) {
    return res.status(400).json({ msg: 'Please include a name and email' });
  }

  drivers.push(newDriver);
  res.json(drivers);
  // res.redirect('/');
});

// Update Driver
router.put('/:id', (req, res) => {
  const found = drivers.some(idFilter(req));

  if (found) {
    drivers.forEach((member, i) => {
      if (idFilter(req)(member)) {

        const updDriver = {...member, ...req.body};
        members[i] = updDriver
        res.json({ msg: 'Driver Profile updated', updDriver });
      }
    });
  } else {
    res.status(400).json({ msg: `No Driver with the id of ${req.params.id}` });
  }
});

// Delete Driver
router.delete('/:id', (req, res) => {
  const found = drivers.some(idFilter(req));

  if (found) {
    res.json({
      msg: 'Driver deleted',
      drivers: drivers.filter(member => !idFilter(req)(member))
    });
  } else {
    res.status(400).json({ msg: `No Driver with the id of ${req.params.id}` });
  }
});



// RIDE-SHARE
// Gets All Ride requests
router.get('/', (req, res) => res.json(riderequests));

// Get Single Ride request
router.get('/:id', (req, res) => {
  const found = riderequests.some(idFilter(req));

  if (found) {
    res.json(riderequests.filter(idFilter(req)));
  } else {
    res.status(400).json({ msg: `No Ride-request with the id of ${req.params.id}` });
  }
});


// Delete Ride requestt
router.delete('/:id', (req, res) => {
  const found = riderequests.some(idFilter(req));

  if (found) {
    res.json({
      msg: 'Ride-request deleted',
      riderequests: riderequests.filter(member => !idFilter(req)(member))
    });
  } else {
    res.status(400).json({ msg: `No Ride-request with the id of ${req.params.id}` });
  }
});



// LOGISTICS
// Get All Logistics Goods requests

router.get('/', (req, res) => res.json(logistics));

// Get Single Logistic request
router.get('/:id', (req, res) => {
  const found = logistics.some(idFilter(req));

  if (found) {
    res.json(logistics.filter(idFilter(req)));
  } else {
    res.status(400).json({ msg: `No Request with the id of ${req.params.id}` });
  }
});

// Create New Logistic request
router.post('/', (req, res) => {
  const newLogistic = {
    ...req.body,
    id: uuid.v4(),
    status: 'active'
  };

  if (!newMember.destination || !newMember.goodsOrpackage) {
    return res.status(400).json({ msg: 'Please include a destination and Package to be delivered' });
  }

  logistics.push(newLogistic);
  res.json(Logistics);
  // res.redirect('/');
});

// Update Logistics Request
router.put('/:id', (req, res) => {
  const found = Logistics.some(idFilter(req));

  if (found) {
    Logistics.forEach((member, i) => {
      if (idFilter(req)(member)) {

        const updLogisticRequest = {...member, ...req.body};
        Logistics[i] = updLogisticRequest
        res.json({ msg: 'Package delivery request updated', updLogisticRequest });
      }
    });
  } else {
    res.status(400).json({ msg: `No Delivery request with the id of ${req.params.id}` });
  }
});

// Delete Logistics Request
router.delete('/:id', (req, res) => {
  const found = Logistics.some(idFilter(req));

  if (found) {
    res.json({
      msg: 'Delivery request deleted',
      Logistics: Logistics.filter(member => !idFilter(req)(member))
    });
  } else {
    res.status(400).json({ msg: `No Delivery request with the id of ${req.params.id}` });
  }
});


module.exports = router;
