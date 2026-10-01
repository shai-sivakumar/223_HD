const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// In-memory database for testing purposes
let appointments = [
    { id: 1, patientName: 'John Doe', symptoms: 'Red rash on arm', status: 'Pending', doctorId: null },
    { id: 2, patientName: 'Jane Smith', symptoms: 'Mole changing color', status: 'Accepted', doctorId: 'Dr. Adams' }
];

// Health Check (For Jenkins Monitoring Stage)
app.get('/health', (req, res) => res.status(200).json({ status: 'Healthy' }));

// ADMIN & DOCTOR: Get all appointments
app.get('/api/appointments', (req, res) => {
    res.status(200).json(appointments);
});

// PATIENT & ADMIN: Create a new appointment
app.post('/api/appointments', (req, res) => {
    const newAppointment = {
        id: appointments.length + 1,
        patientName: req.body.patientName,
        symptoms: req.body.symptoms,
        status: 'Pending',
        doctorId: req.body.doctorId || null
    };
    appointments.push(newAppointment);
    res.status(201).json(newAppointment);
});

// DOCTOR: Update appointment status (Accept/Decline)
app.put('/api/appointments/:id/status', (req, res) => {
    const appointment = appointments.find(a => a.id === parseInt(req.params.id));
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    
    appointment.status = req.body.status;
    res.status(200).json(appointment);
});

// ADMIN: Delete an appointment
app.delete('/api/appointments/:id', (req, res) => {
    appointments = appointments.filter(a => a.id !== parseInt(req.params.id));
    res.status(204).send();
});

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => console.log(`DermaAI Server running on port ${PORT}`));
}

module.exports = app;