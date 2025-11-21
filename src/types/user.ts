import type { DashboardData } from './dashboard';
export type UserRole = 'admin' | 'manager' | 'seller';

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatarUrl?: string;
    phone?: string;
    bio?: string;
    dashboard: DashboardData;
}
