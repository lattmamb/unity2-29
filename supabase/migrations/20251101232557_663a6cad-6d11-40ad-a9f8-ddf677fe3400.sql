-- Create vehicles table
CREATE TABLE public.vehicles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'available',
  battery_level INTEGER NOT NULL DEFAULT 100,
  range_miles INTEGER NOT NULL DEFAULT 300,
  horsepower INTEGER NOT NULL DEFAULT 300,
  acceleration_0_60 NUMERIC(3,1),
  top_speed INTEGER,
  image_url TEXT,
  current_location JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create bookings table
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE CASCADE,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  total_price NUMERIC(10,2),
  pickup_location TEXT,
  dropoff_location TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for vehicles (public read, admin write)
CREATE POLICY "Vehicles are viewable by everyone" 
ON public.vehicles FOR SELECT USING (true);

CREATE POLICY "Vehicles can be inserted by authenticated users" 
ON public.vehicles FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Vehicles can be updated by authenticated users" 
ON public.vehicles FOR UPDATE 
USING (auth.uid() IS NOT NULL);

-- RLS Policies for profiles
CREATE POLICY "Profiles are viewable by everyone" 
ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = user_id);

-- RLS Policies for bookings
CREATE POLICY "Users can view their own bookings" 
ON public.bookings FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bookings" 
ON public.bookings FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bookings" 
ON public.bookings FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own bookings" 
ON public.bookings FOR DELETE 
USING (auth.uid() = user_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_vehicles_updated_at
BEFORE UPDATE ON public.vehicles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at
BEFORE UPDATE ON public.bookings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample vehicles
INSERT INTO public.vehicles (name, type, battery_level, range_miles, horsepower, acceleration_0_60, top_speed, image_url, status, current_location) VALUES
('Model S', 'Sedan', 95, 405, 1020, 1.99, 200, '/lovable-uploads/2de4d0f1-f338-4bbe-ac60-623beab12b7b.png', 'available', '{"lat": 37.7749, "lng": -122.4194}'),
('Model 3', 'Sedan', 88, 358, 480, 3.1, 162, '/lovable-uploads/2f3ebc7e-63b4-418f-abbf-b878a891738f.png', 'active', '{"lat": 37.7849, "lng": -122.4294}'),
('Model X', 'SUV', 92, 348, 1020, 2.5, 155, '/lovable-uploads/4b7e3823-919f-4e0e-876b-56ac588be56f.png', 'charging', '{"lat": 37.7649, "lng": -122.4094}'),
('Model Y', 'SUV', 85, 330, 480, 3.5, 150, '/lovable-uploads/7bd3b5d9-314f-447d-aafe-771d1c11363b.png', 'available', '{"lat": 37.7949, "lng": -122.4394}');