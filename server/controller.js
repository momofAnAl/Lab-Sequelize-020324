require('dotenv').config();
const {CONNECTION_STRING} = process.env;

const Sequelize = require('sequelize');
const sequelize = new Sequelize(CONNECTION_STRING);

let nextEmp = 5

module.exports = {
    getUpcomingAppointments: (req, res) => {
        sequelize.query(`select a.appt_id, a.date, a.service_type, a.approved, a.completed, u.first_name, u.last_name 
        from cc_appointments a
        join cc_emp_appts ea on a.appt_id = ea.appt_id
        join cc_employees e on e.emp_id = ea.emp_id
        join cc_users u on e.user_id = u.user_id
        where a.approved = true and a.completed = false
        order by a.date desc;`)
            .then(dbRes => res.status(200).send(dbRes[0]))
            .catch(err => console.log(err))
    },

    approveAppointment: (req, res) => {
        let {apptId} = req.body
    
        sequelize.query(`*****YOUR CODE HERE*****
        
        insert into cc_emp_appts (emp_id, appt_id)
        values (${nextEmp}, ${apptId}),
        (${nextEmp + 1}, ${apptId});
        `)
            .then(dbRes => {
                res.status(200).send(dbRes[0])
                nextEmp += 2
            })
            .catch(err => console.log(err))
    },

    getAllClients: (req,res) => {
        sequelize.query(`select * from cc_clients c 
        join cc_users u 
        on c.user_id = u.user_id
        where u.user_id = ${userId}`)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log('Error'))
    },

    getPendingAppointments: (req,res) => {
        sequelize.query(`select * from cc_appointments 
        where approved = false
        order by date DESC`)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log('Error!'))
    },

    getPastAppointments: (req, res) => {
        const query = `SELECT a.appt_id, a.date, a.service_type, a.notes, u.first_name, u.last_name
        FROM cc_appointments a
        JOIN cc_emp_appts ea ON a.aapt_id = ea.appt_id
        JOIN cc_employees e ON e.emp_id = ea.em_id
        JOIN cc_users u ON e.user_id = u.user_id
        WHERE a.approved = true and a.completed = true
        ORDER BY a.date DESC;`
        sequelize.query(query)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log('Error!'))
    } 

    
}
