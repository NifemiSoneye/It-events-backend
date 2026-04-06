export interface IAdmin {
  username: string;
  password: string;
  refreshToken?: string[];
}

export interface IAttendee {
  username: string;
  email: string;
  ticket?: number;
  phoneNumber: string;
  createdAt: Date;
  updatedAt: Date;
}
