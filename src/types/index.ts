export interface IAdmin {
  username: string;
  password: string;
  roles: string[]
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
