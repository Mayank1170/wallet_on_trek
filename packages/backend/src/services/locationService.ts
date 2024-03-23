import { supabase } from "../config/supabaseClient";
import { Location } from "../types";

export const locationService = {
  // Fetch all locations
  async getAllLocations(): Promise<Location[]> {
    let { data: locations, error } = await supabase
      .from("locations")
      .select("*");

    if (error) throw new Error(error.message);
    return locations as Location[];
  },

  // Get a single location by ID
  async getLocationById(id: string): Promise<Location | null> {
    let { data: location, error } = await supabase
      .from("locations")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw new Error(error.message);
    return location;
  },

  // Add a new location
  async addLocation(
    newLocation: Omit<Location, "id">
  ): Promise<Location | null> {
    let { data: location, error } = await supabase
      .from("locations")
      .insert([newLocation])
      .single();

    if (error) throw new Error(error.message);
    return location;
  },

  // Update a location by ID
  async updateLocation(
    id: string,
    updateData: Partial<Omit<Location, "id">>
  ): Promise<Location | null> {
    let { data: location, error } = await supabase
      .from("locations")
      .update(updateData)
      .eq("id", id)
      .single();

    if (error) throw new Error(error.message);
    return location;
  },

  // Delete a location by ID
  async deleteLocation(id: string): Promise<void> {
    let { error } = await supabase.from("locations").delete().eq("id", id);

    if (error) throw new Error(error.message);
  },
};
