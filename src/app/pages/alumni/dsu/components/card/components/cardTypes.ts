// cardTypes.ts
export interface AlumniCard {
    id: number;
    isApproved: boolean;
    isRequested: boolean;
    user: {
      id: number;
      first_name: string;
      last_name: string;
      roll_no: string;
      uni_email: string;
    };
  }
  