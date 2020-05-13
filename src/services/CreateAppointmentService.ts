import Appointment from '../models/Appointment';
import { startOfHour } from 'date-fns';
import AppoitmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
    provider: string;
    date: Date;
}

class CreateAppointmentService {

    private appointmentsRepository: AppoitmentsRepository;

    constructor(appointmentsRepository: AppoitmentsRepository) {
        this.appointmentsRepository = appointmentsRepository;
    }

    public execute( {date, provider}: Request ): Appointment {

        const appointmentDate = startOfHour(date);

        const verify = this.appointmentsRepository.findByDate(appointmentDate);

        console.log(verify);
        if (verify) {
            throw Error('Bad Request/ This appointment is already booked')
        }

        const appointment = this.appointmentsRepository.create({
            provider,
            date: appointmentDate,
        });

        return appointment;
    }
}

export default CreateAppointmentService;

