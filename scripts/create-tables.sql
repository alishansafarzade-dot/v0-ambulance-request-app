-- Ambulance Requests Table
CREATE TABLE IF NOT EXISTS ambulance_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Dispatcher/Caller info
  dispatcher_name VARCHAR(100) NOT NULL,
  dispatcher_surname VARCHAR(100) NOT NULL,
  dispatcher_father_name VARCHAR(100) NOT NULL,
  fin VARCHAR(7) NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  
  -- Request details
  call_reason VARCHAR(50) NOT NULL,
  caller_type VARCHAR(20) NOT NULL,
  notes TEXT,
  voice_recording TEXT,
  
  -- Location
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  address TEXT NOT NULL,
  
  -- Assignment
  ambulance_id UUID,
  ambulance_number VARCHAR(20),
  status VARCHAR(50) NOT NULL DEFAULT 'Gözləmədədir',
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  FOREIGN KEY (ambulance_id) REFERENCES ambulances(id)
);

-- Ambulances Table
CREATE TABLE IF NOT EXISTS ambulances (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  number VARCHAR(20) UNIQUE NOT NULL,
  is_available BOOLEAN DEFAULT TRUE,
  current_latitude DECIMAL(10, 8),
  current_longitude DECIMAL(11, 8),
  current_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_requests_status ON ambulance_requests(status);
CREATE INDEX IF NOT EXISTS idx_requests_created_at ON ambulance_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ambulances_available ON ambulances(is_available);
