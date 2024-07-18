export interface Users {
    id: number;
    email: string;
    uni_email: string;
    phone: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    password: string;
    role: number;
    registration_status: number;
    active_status: boolean;
    avatar: string | File;
    password_reset_token: string;
    designation: string;
    company: string;
    qualification: string;
    noOfJobsPosted: number;
}
