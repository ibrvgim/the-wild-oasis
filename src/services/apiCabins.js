import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins couldn't be loaded!");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.trunc(Math.random() * 10000000)}-${
    newCabin.image.name
  }`.replaceAll("/", "");

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // CREATE / EDIT CABIN
  let query = supabase.from("cabins");

  //CREATE CABIN
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  //EDIT CABIN
  if (id)
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id.editId);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin couldn't be created!");
  }

  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data[0].id);

    console.error(error);
    throw new Error(
      "Cabin image couldn't be uploaded and new cabin wasn't created!"
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin couldn't be deleted!");
  }

  return data;
}
