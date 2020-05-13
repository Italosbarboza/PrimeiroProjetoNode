import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppoitmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentsRepository = new AppoitmentsRepository();

appointmentsRouter.get('/', (req, res) => {
    const appointments = appointmentsRepository.findAll();
    return res.json(appointments);
})

appointmentsRouter.post('/', (request, response) => {
    try {

        const {provider, date} = request.body;

        const parsedDate = parseISO(date);


        const createAppointment = new CreateAppointmentService(appointmentsRepository);


        const appointment = createAppointment.execute({ date: parsedDate, provider })
                    ;
        return response.json(appointment);

    } catch(error) {
        return response.status(400).json({error: error.message});
    }
});

export default appointmentsRouter;
