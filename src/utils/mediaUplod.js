import { createClient } from "@supabase/supabase-js";

const url = "https://idgseiyqsxqygurspbsu.supabase.co";
const key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlkZ3NlaXlxc3hxeWd1cnNwYnN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIzNjY1MTYsImV4cCI6MjA3Nzk0MjUxNn0.O08BfREcxOAA_eBbXuLh1eCioAomZoz8h7G3LpxYIwI";

const supabase = createClient(url, key);

export default function uploadfile(file) {
  return new Promise((resolve, reject) => {
    const timeStamp = Date.now();
    const fileName = timeStamp + "-" + file.name;
    supabase.storage
      .from("images")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      })
      .then(() => {
        const publicURL = supabase.storage.from("images").getPublicUrl(fileName)
          .data.publicUrl;
        resolve(publicURL);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
