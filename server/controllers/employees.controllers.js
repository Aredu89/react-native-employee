const mongoose = require('mongoose');
const Employee = mongoose.model('employee');

module.exports.createEmployee = (req, res) => {
  const employee = new Employee({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    picture: req.body.picture,
    salary: req.body.salary,
    position: req.body.position,
  });
  employee.save()
    .then(data => {
      console.log('Created employee: ', data),
      res.send('Success');
    })
    .catch(err => {
      console.log("Error creating employee: ", err);
    })
};

module.exports.deleteEmployee = (req, res) => {
  Employee.findByIdAndRemove(req.body.id)
    .then(data => {
      console.log("Employee deleted: ", data);
      res.send('Employee deleted');
    })
    .catch(err => {
      console.log("Error deleting employee: ", err);
    })
};

module.exports.updateEmployee = (req, res) => {
  Employee.findByIdAndUpdate(req.body.id, {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    picture: req.body.picture,
    salary: req.body.salary,
    position: req.body.position,
  })
    .then(data => {
      console.log('Employee updated: ', data);
      res.send('Employee updated');
    })
    .catch(err => {
      console.log("Error updating employee: ", err);
    })
};