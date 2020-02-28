export class CreateAppointmentDto {
    appointmentId: string;
    doctorId: string;
    patientName: string;
    patientMiddlename?: string;
    patientSurname: string;
    patientEmail: string;
    patientPhone?: string;
    notes?: string;
}