import Appointment from '../models/Appointment';
import { isEqual } from 'date-fns';

interface CreateAppointmentDTO {
    provider: string;
    date: Date;
}

class AppoitmentsRepository {

    private appoitments: Appointment[];

    constructor () {
        this.appoitments = [];
    }

    public findByDate(date: Date) : Appointment | null {

        const findAppointmentInSameDate = this.appoitments.find( appointment =>
            isEqual(date, appointment.date),
        );

        return findAppointmentInSameDate || null;
    }

    public create({ provider, date }: CreateAppointmentDTO ) : Appointment {

        const appointment = new Appointment({
            provider,
            date });
        this.appoitments.push(appointment);
        return appointment;
    }

    public findAll() : Appointment[] {
        return this.appoitments;
    }
}
export default AppoitmentsRepository;
