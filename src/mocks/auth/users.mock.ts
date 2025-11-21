// src/mocks/auth/users.mock.ts

import type { User } from "../../types/user";

export const MOCK_USERS: Array<User & { password: string }> = [
  {
    id: "u1",
    name: "Ana Pérez",
    email: "ana@demo.com",
    password: "demo123",
    role: "admin",
    avatarUrl: "https://i.pravatar.cc/150?img=1",

    dashboard: {
      kpis: {
        todaySales: 1240,
        activeWhatsappChats: 8,
        averageTicket: 52,
        pendingOrders: 3,
      },
      salesByDay: [
        { date: "2025-11-14", total: 800 },
        { date: "2025-11-15", total: 1200 },
        { date: "2025-11-16", total: 950 },
        { date: "2025-11-17", total: 1600 },
        { date: "2025-11-18", total: 2000 },
        { date: "2025-11-19", total: 1750 },
        { date: "2025-11-20", total: 1240 },
      ],
      salesByChannel: [
        { channel: "whatsapp", total: 3200 },
        { channel: "web", total: 2100 },
        { channel: "instagram", total: 950 },
      ],
      salesByPayment: [
        { method: "card", total: 980 },
        { method: "mobile", total: 730 },
        { method: "zelle", total: 420 },
        { method: "transfer", total: 180 },
      ],
      ordersByStatus: [
        { status: "paid", count: 48 },
        { status: "pending", count: 12 },
        { status: "failed", count: 5 },
        { status: "refunded", count: 2 },
      ],
      orders: [
        {
          id: "ORD-1001",
          customerName: "Carlos Ruiz",
          total: 89.9,
          status: "pending",
          channel: "whatsapp",
          paymentMethod: "card",
          createdAt: "2025-11-20T10:24:00Z",
        },
        {
          id: "ORD-1002",
          customerName: "María Gómez",
          total: 120.5,
          status: "paid",
          channel: "instagram",
          paymentMethod: "transfer",
          createdAt: "2025-11-20T09:10:00Z",
        },
      ],
    },
  },

  {
    id: "u2",
    name: "Carlos López",
    email: "carlos@demo.com",
    password: "carlos123",
    role: "seller",
    avatarUrl: "https://i.pravatar.cc/150?img=2",

    dashboard: {
      kpis: {
        todaySales: 420,
        activeWhatsappChats: 3,
        averageTicket: 28,
        pendingOrders: 1,
      },
      salesByDay: [
        { date: "2025-11-14", total: 200 },
        { date: "2025-11-15", total: 350 },
        { date: "2025-11-16", total: 100 },
        { date: "2025-11-17", total: 400 },
        { date: "2025-11-18", total: 300 },
        { date: "2025-11-19", total: 450 },
        { date: "2025-11-20", total: 420 },
      ],
      salesByChannel: [
        { channel: "whatsapp", total: 800 },
        { channel: "web", total: 600 },
        { channel: "instagram", total: 220 },
      ],
      salesByPayment: [
        { method: "card", total: 320 },
        { method: "mobile", total: 150 },
        { method: "zelle", total: 80 },
        { method: "transfer", total: 40 },
      ],
      ordersByStatus: [
        { status: "paid", count: 12 },
        { status: "pending", count: 3 },
        { status: "failed", count: 1 },
        { status: "refunded", count: 0 },
      ],
      orders: [
        {
          id: "ORD-2001",
          customerName: "Luis Martínez",
          total: 45.99,
          status: "paid",
          channel: "web",
          paymentMethod: "card",
          createdAt: "2025-11-20T12:10:00Z",
        },
        {
          id: "ORD-2002",
          customerName: "Daniela Flores",
          total: 28.5,
          status: "pending",
          channel: "whatsapp",
          paymentMethod: "mobile",
          createdAt: "2025-11-20T11:30:00Z",
        },
      ],
    },
  },
];
