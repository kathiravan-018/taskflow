import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "sonner";
import API from "../api/axios";

function EditProfileModal({ onClose }) {

 
  const { user, setUser } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [college, setCollege] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setCollege(user.college);
      setCity(user.city);
    }
  }, [user]);

  async function handleUpdate() {

  if (!name.trim() || !college.trim() || !city.trim()) {
    toast.error("Please fill all fields");
    return;
  }

  try {

    const response = await API.patch("profile/", {
      name,
      college,
      city,
    });

    setUser(response.data);

    toast.success("Profile updated successfully 🎉");

    onClose();

  } catch (error) {

    toast.error("Failed to update profile");

    console.log(error.response?.data);

  }

}

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

      <div className="bg-white rounded-2xl p-6 w-[420px]">

        <h2 className="text-2xl font-bold mb-5">
          Edit Profile
        </h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded-lg p-3 mb-4"
        />

        <input
          type="text"
          placeholder="College"
          value={college}
          onChange={(e) => setCollege(e.target.value)}
          className="w-full border rounded-lg p-3 mb-4"
        />

        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full border rounded-lg p-3 mb-5"
        />

        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="border px-4 py-2 rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            onClick={handleUpdate}
          >
            Save Changes
          </button>

        </div>

      </div>

    </div>
  );
}

export default EditProfileModal;