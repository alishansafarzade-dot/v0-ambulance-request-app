export type RequestStatus =
  | "Gözləmədədir" // Waiting
  | "Ambulans təyin edilib" // Ambulance assigned
  | "Ambulans yaxınlaşıb" // Ambulance approaching
  | "Sorğu yekunlaşıb" // Request completed
  | "Sorğu ləğv edilib" // Request cancelled

export type CallReason =
  | "Ürəktutması" // Heart attack
  | "Xəsarət" // Injury
  | "Yanığ" // Burn
  | "Tənəffüs problemi" // Breathing problem
  | "Digər" // Other

export type CallerType = "Özü üçün" | "Başqası üçün" // For self or For someone else

export interface Location {
  latitude: number
  longitude: number
  address: string
}

export type UserRole = "Sürücü" | "Operator" | "Admin" | "Super Admin" | "Tibbi əməkdaş"
export type Gender = "Kişi" | "Qadın"

export interface User {
  id: string
  firstName: string
  lastName: string
  fatherName: string
  fin: string
  role: UserRole
  gender: Gender
  birthDate: string
  hospitalId?: string
  crewId?: string
  isActive: boolean
  phoneNumber: string
}

export interface Hospital {
  id: string
  name: string
  address: string
  isActive: boolean
}

export interface AmbulanceCrew {
  id: string
  name: string
  hospitalId: string
  memberIds: string[] // List of user IDs
  isActive: boolean
}

export interface AmbulanceRequest {
  id: string
  // Dispatcher/Caller info
  dispatcherName: string // Ad
  dispatcherSurname: string // Soyad
  dispatcherFatherName: string // Ata adı
  fin: string // FİN code
  phoneNumber: string

  // Request details
  callReason: CallReason
  callerType: CallerType
  notes?: string
  voiceRecording?: string // URL to audio file
  location: Location

  // Assignment
  ambulanceNumber?: string
  status: RequestStatus

  hospitalId?: string
  operatorId?: string
  driverId?: string
  responseTime?: number // seconds
  arrivalTime?: number // seconds
  region?: string

  // Timestamps
  createdAt: Date
  updatedAt: Date
}

export interface Ambulance {
  id: string
  number: string
  crewId?: string // Link to crew
  isAvailable: boolean
  currentLocation?: Location
}

export type Language = "az" | "ru" | "en"
